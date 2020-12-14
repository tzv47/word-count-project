import React, { Component } from 'react'


interface WordCountMap {
    word: string;
    occurrence: number
}
interface IState {
    wordArray?: Array<WordCountMap>
}

interface WordCountInput {
    words: string
}

export class WordCountTable extends Component<{ words: string }, IState> {


    public wordArray: Array<{ word: string, occurrence: number }> = []
    public sortWordDescending = false
    public sortCountDescending = true
    constructor(props: WordCountInput) {
        super(props)
        this.state = {
            wordArray: [],
        };

        this.buildWordArray(props.words)
    }

    public componentWillReceiveProps(nextProps: WordCountInput) {
        this.buildWordArray(nextProps.words)

    }

    public sortWordKey() {
        const wordArray = this.state.wordArray || []
        if (this.sortWordDescending) {
            wordArray.sort((a, b) => (a.word > b.word ? -1 : 1) || b.occurrence - a.occurrence)
        } else {
            wordArray.sort((a, b) => (a.word > b.word ? 1 : -1) || b.occurrence - a.occurrence)
        }
        this.sortWordDescending = !!!this.sortWordDescending
        this.sortCountDescending = true
        this.setState({
            wordArray: wordArray
        });
    }

    public sortWordCount() {
        const wordArray = this.state.wordArray || []
        if (this.sortCountDescending) {
            wordArray.sort((a, b) => b.occurrence - a.occurrence || (a.word > b.word ? 1 : -1))

        } else {
            wordArray.sort((a, b) => a.occurrence - b.occurrence || (a.word > b.word ? 1 : -1))
        }
        this.sortWordDescending = true
        this.sortCountDescending = !!!this.sortCountDescending
        this.setState({
            wordArray: wordArray
        });
    }


    private buildWordArray(words: string = '') {
        const wordArray = words.trim().replace(" ", "").split("")
        const wordMapArray: Array<WordCountMap> = []
        const wordMap: Map<string, number> = new Map()
        wordArray.forEach(word => {
            if (!wordMap.has(word)) {
                wordMap.set(word, 0)
            }
            const currentWordCount = wordMap.get(word) as number
            wordMap.set(word, currentWordCount + 1)
        })
        wordMap.forEach((value, key) => {
            wordMapArray.push({ word: key, occurrence: value })
        })
        wordMapArray.sort((a, b) => b.occurrence - a.occurrence || (a.word > b.word ? 1 : -1))
        this.setState({
            wordArray: wordMapArray
        });
    }




    render() {

        return (
            <div >
                <h2>Result</h2>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th className="sortable">Word <i style={{ cursor: 'pointer' }} onClick={() => this.sortWordKey()} className="fa fa-sort"></i></th>
                            <th className="sortable">Count <i style={{ cursor: 'pointer' }} onClick={() => this.sortWordCount()} className="fa fa-sort"></i></th>
                        </tr>
                    </thead>
                    <tbody>

                        {(this.state.wordArray || []).map(word => {
                            return (
                                <tr key={word.word}>
                                    <td>{word.word}</td>
                                    <td>{word.occurrence}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default WordCountTable
