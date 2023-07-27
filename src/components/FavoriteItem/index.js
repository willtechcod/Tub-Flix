import React from "react";
import { 
    Container,
    Title,
    RateContainer,
    Rate,
    ActionContainer,
    DetailButton,
    DeleteButton
 } from './styles';

import { Ionicons, Feather } from '@expo/vector-icons';

export default function FavoriteItem({ data, deleteMovie, navigatePage }){
    return (
        <Container>
            <Title numberOfLines={1} size={20}>{data.title}</Title>
            <RateContainer>
                <Ionicons name='md-star' size={18} color='#E7A74e' />
                <Rate>{data.vote_average}/10</Rate>
            </RateContainer>

            <ActionContainer>
                <DetailButton onPress={()=> navigatePage(data)}>
                    <Title size={16}>Ver Detalhes</Title>
                </DetailButton>

                <DeleteButton onPress={()=> deleteMovie(data.id)}>
                    <Feather name='trash' size={24} color='#FFF' />
                </DeleteButton>

            </ActionContainer>
        </Container>
    );
}