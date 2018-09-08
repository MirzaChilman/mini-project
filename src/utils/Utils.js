export default {
  calculatePrice: (vote) => {
    let harga;

    if (vote > 0 && vote <= 3) {
      harga = `${vote * 3500}`;
    } else if (vote > 3 && vote <= 6) {
      harga = `${vote * 8250}`;
    } else if (vote > 6 && vote <= 8) {
      harga = `${vote * 16350}`;
    } else if (vote > 8 && vote <= 10) {
      harga = `${vote * 21250}`;
    } else {
      harga = 'Belum Tersedia';
    }
    return harga;
  },
  titleToSlug: (string) => {
    const str = string.replace(/\s+/g, '-').toLowerCase();
    return str;
  },
  checkMovie: (movie, movieClicked) => {
    if (movie === movieClicked) {
      console.log('HOLA');
    } else {
      console.log('hALO');
    }
  },
  afforadbleHandler: (vote, id) => {
    const credit = JSON.parse(localStorage.getItem('storageCredit'));
    const price = this.calculatePrice(vote);
    const movie = JSON.parse(localStorage.getItem('storageMovie'));
    /*     const { id } = this.props; */
    if (credit < price && !movie.includes(id)) {
      this.setState({
        buttonStatus: 'Buy more Credit',
        buttonStyle: 'btn-secondary',
        buttonAttr: true,
      });
    }
  },
};