const base = {
  fontWeight: 300,
  background: 'Gainsboro',
  border: 'thin solid',
  borderColor: 'Gainsboro',
  color: 'rgb(74, 82, 90)',
  fontSize: '0.8em',
  padding: '0.2em',
  paddingLeft: '0.4em',
  paddingRight: '0.4em',
  marginRight: '0.4em',
  borderRadius: '0.2em',
  cursor: 'pointer',
}

export default (selected = false) => {
  if (!selected) {
    return {...base,
      background: 'white',
      color: '#4A525A',
      borderColor: '#ADADAD',
    };
  }
  return base;
}
