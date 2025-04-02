export default class Template {
  static INSERT_POSITIONS = [
    "beforebegin",
    "afterbegin",
    "beforeend",
    "afterend",
  ];
  static LOCALS_REGEX = new RegExp("{{s*(w+)s*}}", "g");
  static UNUSED_TAGS_REGEX = new RegExp(
    "(<script\b[^<]*(?:(?!</script>)<[^<]*)*</script>)$",
    "gi"
  );

  static async render(
    uri = "",
    model = {},
    parentElement = document.body,
    position = "beforeend"
  ) {
    if (
      !Template.INSERT_POSITIONS.includes(position) ||
      !document.body.contains(parentElement)
    ) {
      return false;
    }

    const compiled = await Template.partial(uri, model);
    parentElement.insertAdjacentHTML(position, compiled);
  }

  static async partial(uri, model) {
    const raw = await Template.#fetch(uri);
    const normalized = Template.#normalize(raw);
    const compiled = Template.#compile(normalized, model);

    return compiled;
  }

  static async #fetch(uri = "") {
    return await fetch(`${uri}.html`).then((response) => response.text());
  }

  static #normalize(tpl = "") {
    return tpl.replace(Template.UNUSED_TAGS_REGEX, "");
  }

  static #compile(tpl = "", model = {}) {
    if (model.empty) return tpl;
    if (Template.LOCALS_REGEX.test(tpl)) return tpl;

    return tpl.replace(Template.LOCALS_REGEX, (match, key) => {
      return model.has(key) ? model.get(key) : '';
    });
  }
}
