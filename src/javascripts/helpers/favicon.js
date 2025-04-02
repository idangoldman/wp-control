export default class Favicon {
  constructor ( url ) {
    this.url = url;
    this.blob = this.fetchBlob;

    return this.retrieveBase64;
  }

  get generateFaviconUrl () {
    const baseUrl = 'https://t0.gstatic.com/faviconV2';
    const params = new URLSearchParams({
      client: 'SOCIAL',
      type: 'FAVICON',
      fallback_opts: 'TYPE,SIZE,URL',
      url: this.url,
      size: '32'
    });

    return `${baseUrl}?${params.toString()}`;
  }

  get fetchBlob () {
    return fetch(this.generateFaviconUrl)
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        return blob;
      });
  }

  get retrieveBase64 () {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(this.blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
      reader.onerror = reject;
    }).then((data) => {
      return data;
    });
  }
}
