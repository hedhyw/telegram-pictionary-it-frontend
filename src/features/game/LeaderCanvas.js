import CanvasDraw from 'react-canvas-draw';
import { useDispatch, useSelector } from 'react-redux';
import { selectGameLeaderWord, setCanvasImage } from './gameSlice';
import ClearIcon from '@mui/icons-material/Clear';
import UndoIcon from '@mui/icons-material/Undo';
import './LeaderCanvas.css';
import { THEME_DARK, selectTheme } from '../../app/appSlice';

export function LeaderCanvas() {
    const isThemeDark = useSelector(selectTheme) === THEME_DARK;
    const dispatch = useDispatch();
    const leaderWord = useSelector(selectGameLeaderWord);

    let canvasDrawInstance = null;

    return (
        <div className='LeaderCanvas'>
            <CanvasDraw
                className={isThemeDark ? 'LeaderCanvas-Canvas LeaderCanvas-Canvas-dark' : 'LeaderCanvas-Canvas'}
                ref={canvasDraw => (canvasDrawInstance = canvasDraw)}
                brushRadius={2}
                lazyRadius={0}
                onChange={(canvas) => dispatch(setCanvasImage(canvas.getDataURL()))}
            />
            <div className="LeaderCanvas-Actions">
                <div title="Undo last change" onClick={() => { canvasDrawInstance?.undo(); }}>
                    <UndoIcon
                        className="LeaderCanvas-IconButton"
                        htmlColor={window.Telegram?.WebApp?.themeParams?.button_color || 'black'}
                        fontSize="large"
                    />
                </div>
                <p>Draw "{leaderWord || 'word'}"!</p>
                <div title="Clear the entire canvas" onClick={() => { canvasDrawInstance?.eraseAll(); }}>
                    <ClearIcon
                        className="LeaderCanvas-IconButton"
                        htmlColor={window.Telegram?.WebApp?.themeParams?.button_color || 'black'}
                        fontSize="large"
                    />
                </div>

            </div>
        </div>
    );
}