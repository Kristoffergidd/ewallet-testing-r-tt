import './ErrorMessage.css';

function ErrorMessage(props) {
  const { message } = props;

  return (
    <article className='error-message col-2'>
      <p className='error-message__text'>{message.replace('Error:', '')}</p>
    </article>
  );
}

export default ErrorMessage;
