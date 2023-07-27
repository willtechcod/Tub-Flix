import React from "react";
import { 
    Container,
     Banner,
     Title,
     RateContainer,
     Rate,
    } from './styles';

import { Ionicons } from '@expo/vector-icons';
import { Alert } from "react-native";

export default function SearchItem({data, navigatePage}){
    function detailMovie(){
        if(data.release_data === ''){
            Alert.alert('Ops','este filme ainda não tem data de lancamento')
            return;
        }

        navigatePage(data);
    }

    return (
        <Container activeOpacity={0.7} onPress={detailMovie}>
            {data?.poster_path ? (
                <Banner
                    resizeMethod='resize'
                    source={{uri: `https://image.tmdb.org/t/p/w500/${data?.poster_path}`}}
                />
            ) : (
                <Banner 
                    resizeMethod='resize'
                    source={{uri: 'https://triunfo.pe.gov.br/pm_tr430/wp-content/uploads/2018/03/sem-foto.jpg'}}
                />
            )}
            <Title numberOfLines={1}>{data?.title}</Title>
            <RateContainer>
                <Ionicons name='md-star' size={12} color='#e7a74e'/>
                <Rate>{data?.vote_average}/10</Rate>
            </RateContainer>
        </Container>
    );
}