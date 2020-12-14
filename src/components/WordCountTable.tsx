import React, { Component } from 'react'

interface WordCountInput {
    words: string
}

export class WordCountTable extends Component<{ words: string }> {

    public wordArray: Array<{ word: string, occurrence: number }> = []
    constructor(props: WordCountInput) {
        super(props)

        this.buildWordArray(props.words)
    }

    public componentWillReceiveProps(nextProps: WordCountInput) {
        this.buildWordArray(nextProps.words)
    }

    private buildWordArray(words: string = '') {
        this.wordArray = []
        const wordArray = words.trim().split("")
        const wordMap: Map<string, number> = new Map()
        wordArray.forEach(word => {
            if (!wordMap.has(word)) {
                wordMap.set(word, 0)
            }
            const currentWordCount = wordMap.get(word) as number
            wordMap.set(word, currentWordCount + 1)
        })
        wordMap.forEach((value, key) => {
            this.wordArray.push({ word: key, occurrence: value })
        })
        this.wordArray.sort((a, b) => b.occurrence - a.occurrence)
    }



    render() {
        return (
            <div >
                <h2>Result</h2>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Word</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.wordArray.map(word => {
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
