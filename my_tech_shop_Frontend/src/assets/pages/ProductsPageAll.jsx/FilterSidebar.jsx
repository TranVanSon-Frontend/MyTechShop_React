import React from 'react';

const FilterSidebar = () => {
    return (
        <div className="brand-section bg-white p-3 shadow rounded">
            <h3>Thương Hiệu</h3>
            <button type="button" className="btn btn-outline-secondary btn-custom">
                Thương hiệu 1
            </button>
            <h5 className="mt-4">Mức Giá</h5>
            <button className="btn btn-outline-primary btn-custom">Dưới 1 triệu</button>
            {/* Add more filter options here */}
        </div>
    );
};

export default FilterSidebar;
