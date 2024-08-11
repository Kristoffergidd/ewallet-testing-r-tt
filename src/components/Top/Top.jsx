import './Top.css';

function Top(props) {
  const { title } = props;

  return (
    <header className='top'>
      <h1>{title}</h1>
    </header>
  );
}

export default Top;
