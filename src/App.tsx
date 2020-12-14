import React from 'react';
import WordCountTable from './components/WordCountTable';

function App() {

  const [inputValue, setInputValue] = React.useState<string>()

  const onTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value)
    console.log(inputValue)
  }

  return (
    <div className="container">
      <form>
        <div className="form-group">
          <label >Count your words</label>
          <textarea value={inputValue} onChange={onTextChange} className="form-control" id="exampleFormControlTextarea1" ></textarea>
        </div>
        <WordCountTable words={inputValue as string} />
      </form>
    </div>
  );
}

export default App;
