import React from "react";
import { CharList } from "./charList";

export class Rank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chars: [
        "Radagatsio",
        "Ardillon",
        "Dimitrij del Toro",
        "King Nakio",
        "Loko Zwisky",
        "Sweetbullet",
        "Roluhnx",
        "Cropolito",
        "Stwuee",
        "Zapatilla the Cat",
        "Archer del Yoda",
        "Loko Kenos",
        "Borgolito",
        "Rolo Manyin",
        "Sousi Taro",
        "Ardillon the Great",
        "Gordo Vegano",
        "Eldermake"
      ],
      charList: [],
      loading: true,
      activeChar: false,
    };
  }

  // loadChars() carga la lista de personajes de forma asíncrona.
  // charsToLoad = array de nombres de personajes
  // Retorna un arreglo de objetos con la info de cada personaje.
  loadChars = async (charsToLoad) => {
    let loadedCharList = [];
    await asyncForEach(charsToLoad, async (char) => {
      let charInfo = await this.getChar(char);
      if (charInfo) {
        loadedCharList.push(charInfo);
      }
    });
  
    if (loadedCharList.length === 0) {
      console.error("No se pudieron cargar personajes válidos.");
      return [];
    }
  
    loadedCharList.sort((a, b) => b.level - a.level);
    loadedCharList = this.rankChars(loadedCharList);
    return loadedCharList;
  };
  
  // getChar() retorna el objeto con la info del personaje.
  getChar = async (charName) => {
    let targetUrl = `https://api.tibiadata.com/v4/character/${charName}`;
    try {
      let response = await fetch(targetUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let data = await response.json();
  
      if (data?.character?.character) {
        // Agregar propiedades de 'character' y 'other_characters' en un solo objeto.
        return {
          ...data.character.character,
          other_characters: data.character.other_characters
        };
      } else {
        console.error(`Error: Respuesta inesperada para ${charName}`, data);
        return null;
      }
    } catch (error) {
      console.error(`Error al obtener datos del personaje ${charName}:`, error);
      return null;
    }
  };

  // rankChars() asigna el ranking a cada personaje comparando su nivel con el anterior.
  rankChars = (charList) => {
    if (!charList || charList.length === 0) {
      console.error("El arreglo charList está vacío o es inválido.");
      return [];
    }
  
    let previousCharLevel = charList[0].level;
    let rank = 1;
    for (let [index, char] of charList.entries()) {
      if (char.level < previousCharLevel) {
        rank = index + 1;
        previousCharLevel = char.level;
      }
      charList[index].rank = rank;
    }
    return charList;
  };

  clickChar = (clickedChar) => {
    this.setState(prevState => ({
      activeChar: prevState.activeChar?.name === clickedChar?.name ? null : clickedChar
    }));
  }

  async componentDidMount() {
    let loadedCharList = await this.loadChars(this.state.chars);
    this.setState({ charList: loadedCharList, loading: false });
  }

  render() {
    return (
      <CharList
        loading={this.state.loading}
        clickChar={this.clickChar}
        charList={this.state.charList}
        activeChar={this.state.activeChar} />
    );
  }
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
