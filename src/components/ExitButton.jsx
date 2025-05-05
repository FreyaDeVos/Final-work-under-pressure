function ExitButton() {
  const handleClick = () => {
    alert('Sluiten!');
  };

  return (
    <button className="exit-button" onClick={handleClick}>
      ×
    </button>
  );
}

export default ExitButton;

  