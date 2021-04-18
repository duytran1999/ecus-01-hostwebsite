import React, { Component } from 'react';
import { FirebaseApp } from '../firebase'
export default class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: '',
            listimg: [],
        };
    }
    componentDidMount() {
        FirebaseApp.database()
            .ref("picture/")
            .on('value', imageSnapshot => {
                let ListImage = [];
                imageSnapshot.forEach((img) => {
                    console.log(img.val().imagePreviewUrl)
                    ListImage.push({
                        imageMsg: img.val().imagePreviewUrl
                    })
                })
                this.setState({
                    listimg: ListImage
                })

            })
        
    }
    _handleSubmit(e) {
        e.preventDefault();
        FirebaseApp.database()
            .ref('picture/')
            .push({
                imagePreviewUrl: this.state.imagePreviewUrl,
            })
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file)
    }
    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} style={{ height: 100, width: 100 }} />);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }
        return (
            <div className="previewComponent">
                <form onSubmit={(e) => this._handleSubmit(e)}>
                    <input className="fileInput"
                        type="file"
                        onChange={(e) => this._handleImageChange(e)} />
                    <button className="submitButton"
                        type="submit"
                        onClick={(e) => this._handleSubmit(e)}>Upload Image</button>
                </form>
                <div className="imgPreview">
                    {$imagePreview}

                </div>
                {
                    this.state.listimg.map((item, index) => (
                        <img src={item.imageMsg} key={index}
                            style={{ height: 100, width: 100 }} />
                    ))
                }
            </div>
        )
    }
}

