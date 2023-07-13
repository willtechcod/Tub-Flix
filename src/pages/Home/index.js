import React from "react";

import { Feather } from '@expo/vector-icons';

import { Container, SearchContainer, SearchButton, Input } from './styles';

import Header from "../../components/Header";



function Home(){
    return(
        <Container>
            <Header title="Tube Flix" />
            <SearchContainer>
                <Input 
                placeholder="Ex Jhon wick"
                placeholderTextColor="#DDD"
                />
                <SearchButton>
                    <Feather name='search' size={28} color='#FFF' />
                </SearchButton>
            </SearchContainer>
        </Container>
    )
}

export default Home;