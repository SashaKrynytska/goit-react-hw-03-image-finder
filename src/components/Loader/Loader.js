import { InfinitySpin } from 'react-loader-spinner';
import PropTypes from 'prop-types';

export const Loader = ({ visible }) => (
  <InfinitySpin width="200" color="#4fa94d" visible={visible} />
);

Loader.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default Loader;
