import React, {useEffect, useState} from "react";
import { ScrollView, ActivityIndicator } from "react-native";
import { Feather } from '@expo/vector-icons';

import { Container, 
    SearchContainer, 
    SearchButton, 
    Input,
    Title,
    BannerButton,
    Banner,
    SliderMovie,
    Spinner
       } from './styles';

import Header from "../../components/Header";
import SliderItem from "../../components/SliderItem";

import api, { key } from '../../services/api';
import { getListMovies, randomBanner } from '../../utils/movie';
import { useNavigation } from '@react-navigation/native'
import { Alert } from "react-native";

function Home(){
  const navigation = useNavigation();

    const [nowmovies, setNowMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topmovies, setTopMovies] = useState([]);
    const [bannerMovie, setBannerMovie] = useState({});
    const [input, setInput] = useState('');

    const [loading, setLoading] = useState(true);

    useEffect (() => {
        let isActive = true;
        const ac = new AbortController();

        async function getMovies(){

           const [nowData, popularData, topData] = await Promise.all([
              api.get('/movie/now_playing', {
                params:{
                    api_key: key,
                    language: 'pt-BR',
                    page: 1,
                }
              }),
              api.get('/movie/popular', {
                params:{
                    api_key: key,
                    language: 'pt-BR',
                    page: 1,
                }
              }),
              api.get('/movie/top_rated', {
                params:{
                    api_key: key,
                    language: 'pt-BR',
                    page: 1,
                }
              }),
           ])

           if(isActive){
            const nowList = getListMovies(20, nowData.data.results);
            const popularList = getListMovies(15, popularData.data.results);
            const topList = getListMovies(10, topData.data.results);

            setBannerMovie(nowData.data.results[randomBanner(nowData.data.results)]);

            setNowMovies(nowList);
            setPopularMovies(popularList);
            setTopMovies(topList);

            setLoading(false);
           }
            
        }

        getMovies();

        return () => {
          isActive = false;
          ac.abort();
        }

    }, [])

    function navigateDetailsPage(item){
      navigation.navigate('Detail', {id: item.id});
    }

    function handleSearchMovie(){
      if(input === '')return;

      navigation.navigate('Search',{name: input})
      setInput('');
    }

    if(loading){
      return(
        <Spinner>
          <ActivityIndicator size='large' color='#E72f'/>
        </Spinner>
      )
    }

    
    return(
        <Container>
            <Header title="Tube Flix" />
            <SearchContainer>
                <Input 
                placeholder="Faça sua busca"
                placeholderTextColor="#DDD"
                value={input}
                onChangeText={(text) => setInput(text)}
                />
                <SearchButton onPress={handleSearchMovie}>
                    <Feather name='search' size={28} color='#FFF' />
                </SearchButton>
            </SearchContainer>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Title>Em Cartaz</Title>
                <BannerButton 
                activeOpacity={0.8}
                onPress={ () => navigateDetailsPage(bannerMovie)}
                >
                    <Banner
                     resizeMethod="resize"
                     source={{uri:`https://image.tmdb.org/t/p/original/${bannerMovie.poster_path}`}}
                     />
                </BannerButton>

                <SliderMovie
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={nowmovies}
                  renderItem={({ item }) => <SliderItem data={item} navigatePage={() => navigateDetailsPage(item)} /> }
                  keyExtractor={(item) => String(item.id)}
                />

                <Title>Populares</Title>

                <SliderMovie
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={popularMovies}
                  renderItem={({ item }) => <SliderItem data={item} navigatePage={() => navigateDetailsPage(item)} /> }
                  keyExtractor={(item) => String(item.id)}
                />

                <Title>Mais Votados</Title>

                <SliderMovie
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={topmovies}
                  renderItem={({ item }) => <SliderItem data={item} navigatePage={() => navigateDetailsPage(item)} /> }
                  keyExtractor={(item) => String(item.id)}
                />

            </ScrollView>

        </Container>
    )
}

export default Home;