import { CardsType, CardType } from '../../types/types';
import FavoritesLocations from './favorites-location';
import { useAppSelector } from '../../hooks/hooks';
import { getFavoritesState } from '../../store/offers-data/offers-data.selectors';

type FavoritesListProps = {
  onFavoriteClick: (isfavorite: boolean) => void;

}

function FavoritesList({onFavoriteClick} : FavoritesListProps): JSX.Element {
  const favoriteArray = useAppSelector(getFavoritesState);

  const groupedArrays = favoriteArray.reduce((result: CardsType[], obj : CardType) => {
    const existingArray = result.find((arr : CardsType) => arr[0].city.name === obj.city.name);
    if (existingArray) {
      existingArray.push(obj);
    } else {
      result.push([obj]);
    }
    return result;
  }, []);

  return (
    <ul className="favorites__list">
      {groupedArrays.map((item) => (<FavoritesLocations key = {item[0].city.name} rentsLocation={item} onFavoriteClick={onFavoriteClick}/>))}
    </ul>
  );
}

export default FavoritesList;
