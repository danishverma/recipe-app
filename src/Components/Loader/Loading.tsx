
import Loader from 'react-js-loader';

const Loading = () => {
    return (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="item">
                <Loader type="bubble-scale" bgColor='#0033cc' color='' size={150} />
            </div>
        </div>
    );
};

export default Loading;
