import React from 'react';
import './App.css';

import logo from './assets/HubblefyLogo.png'

class App extends React.Component {
  state = {
    toggleScreen: true,
    name:'',
    email:'',
    department: '',
    accessLevel: '',
    members: []
  }

  fetchScreen = () => {
    this.setState({ toggleScreen: !this.state.toggleScreen})
    this.setState({name: '', email: '', department: '', accessLevel: ''})

  }

  handleChangeName = (event) => {
    this.setState({ name: event.target.value})
  }
  handleChangeEmail = (event) => {
    this.setState({ email: event.target.value})
  }
  handleChangeDepartment = (event) => {
    this.setState({ department: event.target.value})
  }
  handleChangeAL = (event) => {
    this.setState({ accessLevel: event.target.value})
  }

  addMember = () => {
    if(this.state.name != '' && this.state.email != '' && this.state.department != '' && this.state.accessLevel != ''){
      const members = [...this.state.members]
      members.push({
        name: this.state.name,
        email: this.state.email,
        department: this.state.department,
        accessLevel: this.state.accessLevel
      })
      this.setState({members, name: '', email: '', department: '', accessLevel: ''}, this.fetchScreen())
    }
  }

  removeMember = indexToRemove => {
    const rawList = [...this.state.members]
    const members = rawList.filter((member, index) => {
      if(index != indexToRemove){
        return{member}
      }
    })
    this.setState({members})
    this.listMember()
  }

  listMember = () => {
    const rawList = [...this.state.members]
    const list = rawList.map((member, index) => 
      <li className="list-area">
        <a className="title" href="#">
          <strong>{member.accessLevel}:</strong> {member.name}
        </a>
        <button className="button-list" onClick={() => this.removeMember(index)}>x</button>
      </li>
    )
    return(list)
  }
  

  render(){
    return (
      <div className="App">
        <img id="logo" src={logo}/>
        <div id="info-box">
          <p className="info" id="sub-title"><strong>Membros da Org</strong></p>
          <p className="info">Chegou a hora de adicionar os</p>
          <p className="info">primeiros mombros da sua nova org:</p>  
        </div>

        {this.state.toggleScreen? 
          this.state.members.length != 0? 
            <ul class="added-members">
              {this.listMember()}
            </ul> 
            :
            null
          :
          <form id="form-container">
              <label>
                <p id="title-form"><strong>Nome:</strong></p>
                <input type="text" required 
                  placeholder='ex: Erin Green'
                  value={this.state.name} 
                  onChange={this.handleChangeName}/>
              </label>

              <label>
                <p id="title-form"><strong>Email:</strong></p>
                <input type="email" required 
                placeholder='ex: e.green@company.now' 
                value={this.state.email} 
                onChange={this.handleChangeEmail}/>
              </label>

              <label>
                <p id="title-form"><strong>Departamento:</strong></p>
                <input type="text" required 
                  placeholder='ex: Tech' 
                  value={this.state.department} 
                  onChange={this.handleChangeDepartment}/>
              </label>

              <label>
                <p id="title-form"><strong>Nível de Acesso:</strong></p>
                <select type="text" required onChange={this.handleChangeAL}>
                  <option value="" disabled selected hidden>Escolha...</option>
                  <option value="Usuário">Usuário</option>
                  <option value="Leitor">Leitor</option>
                  <option value="Admin">Admin</option>
                </select>
              </label>

              <button type="submit" onClick={() => this.addMember()} 
                className="button-home" id="save-button"
                disabled={this.state.name == '' || this.state.email == '' || this.state.department == '' || this.state.accessLevel == ''}>
                  Salvar
              </button>
              <button type="reset" onClick={() => this.fetchScreen()} id="cancel-button">Cancelar</button>
          </form>
        }

        {this.state.toggleScreen? 
          <button className="button-home" id="add-button" onClick={() => this.fetchScreen()}>
          Adicionar membro
          </button>
          :
          null
        }

        {this.state.toggleScreen?
          this.state.members.length != 0? 
            <button className="button-home" id="secund-button">Enviar convites</button>
            : 
            <button className="button-home" id="secund-button">Ir para Org</button>
          :
          null
        }
      </div>
    )
  }
}

export default App;