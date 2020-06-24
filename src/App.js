import React from "react";

import "./styles.scss";

import { secondsToTime, capitalize } from "./utils";

import { options } from "./data/options";
import { words } from "./data/words";

function Option(props) {
  const [optionState, setOptionState] = React.useState(props.option);

  const printListItem = (group, optionChoice) => {
    const classChoice = optionChoice
      ? "active traffic-lights__" + group
      : "traffic-lights__" + group;
    return (
      <li
        className={classChoice}
        onClick={() => {
          setOptionState({
            ...optionState,
            [group]: !optionChoice
          });
          props.updateGroup(group, optionState.name);
        }}
      />
    );
  };
  return (
    <div className="options">
      <ul className="traffic-lights">
        {printListItem("definitely", optionState.definitely)}
        {printListItem("maybe", optionState.maybe)}
        {printListItem("not", optionState.not)}
      </ul>
      <span>{optionState.name}</span>
    </div>
  );
}

function Category(props) {
  return (
    <div>
      <h2>{props.category.name}</h2>
      {props.category.options.map((option, i) => {
        return (
          <Option
            option={option}
            updateGroup={props.updateGroup}
            key={option.name + "-" + i}
          />
        );
      })}
    </div>
  );
}

function WordGenerator() {
  const [guesses, setGuesses] = React.useState([]);
  const retrieveWord = () => {
    let notFoundWord = true;
    while (notFoundWord) {
      const wordChosen = words[Math.floor(Math.random() * words.length)];
      if (!guesses.includes(wordChosen)) {
        setGuesses(guesses.concat(wordChosen));
        notFoundWord = false;
      }
    }
  };

  return (
    <div>
      <h2>
        <div className="generate-word" onClick={() => retrieveWord()}>
          New Word
        </div>
        Word: {guesses[guesses.length - 1]}
      </h2>
    </div>
  );
}

function Countdowner() {
  const [isStarted, setIstarted] = React.useState(false);
  const [counter, setCounter] = React.useState(180);
  React.useEffect(() => {
    if (isStarted) {
      if (counter > 0) {
        setTimeout(() => setCounter(counter - 1), 1000);
      } else {
        setIstarted(false);
      }
    }
  }, [counter, isStarted]);

  function start() {
    setIstarted(true);
  }

  return (
    <div>
      Countdown: {secondsToTime(counter)}
      <div onClick={() => start()}>Start</div>
    </div>
  );
}

export default function App() {
  const [categoryGroups, setCategoryGroupsState] = React.useState({
    definitely: [],
    maybe: [],
    not: []
  });

  const updateGroup = (group, value) => {
    let newArray = [...categoryGroups[group]];

    if (newArray.indexOf(value) > -1) {
      newArray.splice(newArray.indexOf(value), 1);
    } else {
      newArray.push(value);
    }
    setCategoryGroupsState({ ...categoryGroups, ...{ [group]: newArray } });
  };

  const optionsMapping = () => {
    const categories = [];
    options.map((option, i) => {
      let found = false;
      categories.forEach(category => {
        if (category.name === option.category) {
          category.options.push(option);
          found = true;
        }
      });
      if (!found) {
        categories.push({ name: option.category, options: [option] });
      }
      return null;
    });
    return categories;
  };
  return (
    <div className="Funglish">
      <h1>Funglish</h1>
      <WordGenerator />
      <Countdowner />
      {Object.keys(categoryGroups).map((name, index) => {
        return (
          <div key={index}>
            <strong>{capitalize(name)}: </strong>
            {categoryGroups[name].map((item, index2) => {
              if (index2 < categoryGroups[name].length - 1) {
                return item + ", ";
              } else {
                return item;
              }
            })}
          </div>
        );
      })}{" "}
      <div className="categories">
        {optionsMapping().map((category, i) => {
          return (
            <Category category={category} key={i} updateGroup={updateGroup} />
          );
        })}
      </div>
    </div>
  );
}
