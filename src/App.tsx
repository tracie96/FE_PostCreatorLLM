import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #f0f0f0;
  height: 100vh;
`;

const Header = styled.h1`
  color: #333;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  color: #555;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  width: 300px;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 320px;
`;

const Button = styled.button`
  padding: 10px 20px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ResultContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 400px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

const App = () => {
  const [context, setContext] = useState('');
  const [platform, setPlatform] = useState('Generic');
  const [generatedPost, setGeneratedPost] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e:any) => {
    setContext(e.target.value);
  };

  const handlePlatformChange = (e:any) => {
    setPlatform(e.target.value);
  };

  const generatePost = async () => {
    try {
      setError('');
      const response = await axios.post('https://5452-102-89-22-54.ngrok-free.app/', {
        context_words: context.split(' '),
        platform: platform
      });
      setGeneratedPost(response.data.post);
    } catch (err) {
      setError('Seems my server is down.');
      console.error('Error generating post:', err);
    }
  };

  return (
    <Container>
      <Header>Post Generator Sample</Header>
      <InputContainer>
        <Label>Add Context:</Label>
        <Input type="text" value={context} onChange={handleInputChange} placeholder="Enter words e.g., summer, vacation, beach"/>
        <Label>Platform:</Label>
        <Select value={platform} onChange={handlePlatformChange}>
          <option value="Twitter">Twitter</option>
          <option value="Instagram">Instagram</option>
          <option value="LinkedIn">LinkedIn</option>
        </Select>
        <Button onClick={generatePost}>Generate Post</Button>
      </InputContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {generatedPost && (
        <ResultContainer>
          <h3>Generated Post: (you can edit to your taste)</h3>
          <ReactQuill value={generatedPost} theme="snow" />
        </ResultContainer>
      )}
    </Container>
  );
};

export default App;
