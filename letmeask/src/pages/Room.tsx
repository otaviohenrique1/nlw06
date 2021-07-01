import React, { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import logoImg from "../assets/images/logo.svg";
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import '../styles/room.scss';

type RoomParams = { 
  id: string;
}

export function Room() {
  const { user } = useAuth();
  const [newQuestion, setNewQuestion] = useState('');
  const params = useParams<RoomParams>();
  const roomId = params.id;
  
  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === '') {
      /* Verifica se o campo esta vazio */
      return;
    }

    if (!user) {
      /* Verifica se o usuario esta logado */
      throw new Error("You most be logged in");
    }
    
    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswer: false
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion(''); /* Limpa o campo */
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <RoomCode
            code={roomId}
          />
        </div>
      </header>
      <main className="content">
        <div className="room-title">
          <h1>Sala React</h1>
          <span>4 perguntas</span>
        </div>
        <form onSubmit={(event) => handleSendQuestion(event)}>
          <textarea
            placeholder="O que voce quer perguntar?"
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
          />
          <div className="form-footer">
            {(user) ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>Para enviar uma pergunta, <button>faça o seu login.</button></span>
            )}
            <Button
              type="submit"
              disabled={!user}
            >
              Enviar pergunta
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}