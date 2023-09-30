import CanvasDraw from 'react-canvas-draw';
import { useDispatch, useSelector } from 'react-redux';
import { selectGameLeaderWord, setCanvasImage } from './gameSlice';

export function LeaderCanvas() {
    const dispatch = useDispatch();
    const leaderWord = useSelector(selectGameLeaderWord);

    let canvasDrawInstance = null;

    return (
        <div>
            <CanvasDraw
                ref={canvasDraw => (canvasDrawInstance = canvasDraw)}
                brushRadius={2}
                lazyRadius={0}
                onChange={(canvas) => dispatch(setCanvasImage(canvas.getDataURL()))}
            />
            <button
                onClick={() => {
                    canvasDrawInstance?.undo();
                }}
            >
                Undo
            </button>
            <button
                onClick={() => {
                    canvasDrawInstance?.eraseAll();
                }}
            >
                Clear
            </button>
            <p>Draw "{leaderWord}"!</p>
        </div>
    );
}