import React from 'react';
import WordCountTable from './components/WordCountTable';

function App() {

  const [inputValue, setInputValue] = React.useState<string>()

  const onTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value)
  }

  return (
    <main>
      <section className="text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Word Count</h1>
          </div>
        </div>
      </section>
      <div className="container">
        <form>
          <div className="form-group">
            <label >Enter words to count</label>
            <textarea value={inputValue} onChange={onTextChange} className="form-control" id="exampleFormControlTextarea1" ></textarea>
          </div>
          <WordCountTable words={inputValue as string} />
        </form>
      </div>
    </main>
  );
}

export default App;
