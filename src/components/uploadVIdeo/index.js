import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { uploadImage } from 'src/apis/options';
import { Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadVideo = ({ setInfo, type, url }) => {
    const _uploadImage = () => {
        let inputTag = document.createElement('input');
        inputTag.type = 'file';
        inputTag.accept = 'video/*';
        inputTag.onchange = (_this) => {
            let files = _this.target.files;
            let fileToUpload = files[0];
            const formData = new FormData();
            formData.append('file', fileToUpload);
            formData.append('name', fileToUpload.name);
            let media = new Audio();
            let duration = 0;
            media.src = URL.createObjectURL(files[0]);
            media.onloadedmetadata = function (e) {
                duration = media.duration;
            };
            uploadImage(formData)
                .then((res) => {
                    setInfo({ url: res.data, duration: Math.floor(duration) });
                })
                .catch(() => {});
        };
        inputTag.click();
    };
    return (
        <>
            <Button onClick={_uploadImage} className="btn-outline-info" icon={<UploadOutlined />}>
                Upload
            </Button>
        </>
    );
};
UploadVideo.propTypes = {
    setInfo: PropTypes.func,
    type: PropTypes.string,
    url: PropTypes.string,
};
export default UploadVideo;
