CKEDITOR.dialog.add('uploadimageDialog', function (editor) {
    return {
        title: editor.lang.uploadimage.title,
        minWidth: 400,
        minHeight: 80,
        contents: [
            {
                id: 'tab-basic',
                label: 'Basic Settings',
                elements: [
                    {
                        type: 'html',
                        html: '<p>' + editor.lang.uploadimage.onlytxt + '</p>'
                    },
                    {
                        type: 'file',
                        id: 'file_upload',
                        label: editor.lang.uploadimage.file_upload
                    },
                  /*  {
                        type: 'text',
                        id: 'css_class',
                        label: editor.lang.uploadimage.input_css
                    },*/
                    {
                        type: 'text',
                        id: 'width',
                        label: editor.lang.uploadimage.width
                    },
                    {
                        type: 'text',
                        id: 'height',
                        label: editor.lang.uploadimage.height
                    }
                ]
            }
        ],
        onOk: function () {
            var
                dialog = this,
                div_container = new CKEDITOR.dom.element('div'),
                css = 'uploadimage',
                width = '560',
                height = '350',
                file_upload;
            // Set custom css class name
           /* if (dialog.getValueOf('tab-basic', 'css_class').length > 0) {
                css = dialog.getValueOf('tab-basic', 'css_class');
            }*/

            if (dialog.getValueOf('tab-basic', 'width').length > 0) {
                width = dialog.getValueOf('tab-basic', 'width');
            }

            if (dialog.getValueOf('tab-basic', 'height').length > 0) {
                height = dialog.getValueOf('tab-basic', 'height');
            }

            if (dialog.getValueOf('tab-basic', 'file_upload').length > 0) {
                file_upload = dialog.getContentElement('tab-basic', 'file_upload').getInputElement();
            }
            // div_container.setAttribute('class', css);
            // div_container.setAttribute('width', width);
            // div_container.setAttribute('height', height);

            var formData = new FormData();
            formData.append('upload_image', file_upload.$.files[0]);
            formData.append('css',css);
            formData.append('width', width);
            formData.append('height', height);
            var scope = angular.element(document.getElementById("WoFoxApp")).scope();
            var upload= scope.adminCtrl.uploadFileUpload(formData, function(){
                var url = scope.adminCtrl.uploadUrl;
                var iframe = new CKEDITOR.dom.element.createFromHtml(url);
                div_container.append(iframe);
                editor.insertElement(div_container);

            });


        }
    };
});