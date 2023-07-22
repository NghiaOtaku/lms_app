import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import avatar from 'src/assets/default-avatar.png';
import thumbnail from 'src/assets/default.png';
import { uploadImage } from 'src/apis/options';
import { PlusOutlined } from '@ant-design/icons';

import { DOMAIN } from 'src/constants/api';

const UploadImage = ({ setUrl, type, url }) => {
    const _uploadImage = () => {
        let inputTag = document.createElement('input');
        inputTag.type = 'file';
        inputTag.accept = 'image/png, image/jpeg';
        inputTag.onchange = (_this) => {
            let files = _this.target.files;
            let fileToUpload = files[0];
            const formData = new FormData();
            formData.append('file', fileToUpload);
            formData.append('name', fileToUpload.name);
            uploadImage(formData)
                .then((res) => {
                    setUrl(DOMAIN + res.data);
                })
                .catch(() => {});
        };
        inputTag.click();
    };
    const className = 'box-img ' + (type === 'thumbnail' ? 'thumbnail' : 'avatar');
    return (
        <>
            <div className={className}>
                <div className="img">
                    <img
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = type === 'thumbnail' ? thumbnail : avatar;
                        }}
                        src={url}
                        alt=""
                    />
                </div>
                <div className="caption" onClick={_uploadImage}>
                    <div className="file-input-wrapper">
                        <div className="btn-file-input">
                            <PlusOutlined />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
UploadImage.propTypes = {
    setUrl: PropTypes.func,
    type: PropTypes.string,
    url: PropTypes.string,
};
export default UploadImage;
