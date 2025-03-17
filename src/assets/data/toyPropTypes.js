import PropTypes from "prop-types";

export const toyType=  PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        imgUrl: PropTypes.string.isRequired,
        labels: PropTypes.arrayOf(PropTypes.string),
        createdAt: PropTypes.number.isRequired,
        inStock: PropTypes.bool.isRequired
    }).isRequired
