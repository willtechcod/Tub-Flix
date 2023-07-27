import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
    padding: 14px;
`;

export const Banner = styled.Image`
    width: 100%;
    height: 220px;
    border-radius: 8px;
`;
export const Title = styled.Text`
    color: #FFF;
    font-size: 18;
    font-weight: bold;
    padding-top: 8px;
`;

export const RateContainer = styled.View`
    flex-direction: row;
    align-items: center;
    padding-top: 4px;
`;

export const Rate = styled.Text`
    color: #FFF;
    font-size: 14px;
    padding-left: 4px;
`;