import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { useLocation } from 'react-router-dom';
import { logoutAction} from '../../store/api-actions';
import { getFavoritesState } from '../../store/offers-data/offers-data.selectors';
import { getLogin } from '../../store/user-process/user-process.selectors';
import { AppRoute } from '../../const';
import { redirectToRoute } from '../../store/action';

type NavComponentProps = {
  favoritesCount?: number;
}

function NavComponent({favoritesCount} : NavComponentProps): JSX.Element {
  const loginState = useAppSelector(getLogin);
  const favorites = useAppSelector(getFavoritesState);
  const dispatch = useAppDispatch();
  const location = useLocation().pathname === '/';

  const handleClickSignOut = async() => {
    await dispatch(logoutAction());
    if(location){
      dispatch(redirectToRoute(AppRoute.Root));
    }
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link to="/favorites" className="header__nav-link header__nav-link--profile" >
            <div className="header__avatar-wrapper user__avatar-wrapper">
              <img className="reviews__avatar user__avatar" src={loginState?.avatarUrl} width="54" height="54" alt="Reviews avatar" />
            </div>
            <span className="header__user-name user__name">{loginState?.email}</span>
            <span className="header__favorite-count">{favoritesCount ? favoritesCount : favorites.length}
            </span>
          </Link>

        </li>
        <li className="header__nav-item" onClick={() => {
          handleClickSignOut();
        }}
        >
          <Link to="/" className="header__nav-link" >
            <span className="header__signout">Sign out</span>
          </Link>
        </li>

      </ul>
    </nav>
  );
}

export default NavComponent;
