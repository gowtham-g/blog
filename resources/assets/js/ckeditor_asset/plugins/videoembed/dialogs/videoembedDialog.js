/*
 *   Plugin developed by CTRL+N.
 *
 *   LICENCE: GPL, LGPL, MPL
 *   NON-COMMERCIAL PLUGIN.
 *
 *   Website: https://www.ctrplusn.net/
 *   Facebook: https://www.facebook.com/ctrlplusn.net/
 *
 */
CKEDITOR.dialog.add('videoembedDialog', function (editor) {
    return {
        title: editor.lang.videoembed.title,
        minWidth: 400,
        minHeight: 80,
        contents: [
            {
                id: 'tab-basic',
                label: 'Basic Settings',
                elements: [
                    {
                        type: 'html',
                        html: '<p>' + editor.lang.videoembed.onlytxt + '</p>'
                    },
                    {
                        type: 'text',
                        id: 'url_video',
                        label: 'URL (ex: https://www.youtube.com/watch?v=EOIvnRUa3ik)',
                        validate: CKEDITOR.dialog.validate.notEmpty(editor.lang.videoembed.validatetxt)
                    },
                    {
                        type: 'text',
                        id: 'css_class',
                        label: editor.lang.videoembed.input_css
                    },
                    {
                        type: 'text',
                        id: 'width',
                        label: editor.lang.videoembed.width
                    },
                    {
                        type: 'text',
                        id: 'height',
                        label: editor.lang.videoembed.height
                    }
                ]
            }
        ],
        onOk: function () {
            var
                dialog = this,
                div_container = new CKEDITOR.dom.element('div'),
                css = 'videoEmbed',
                width = '560',
                height = '350';
            // Set custom css class name
            if (dialog.getValueOf('tab-basic', 'css_class').length > 0) {
                css = dialog.getValueOf('tab-basic', 'css_class');
            }

            if (dialog.getValueOf('tab-basic', 'width').length > 0) {
                width = dialog.getValueOf('tab-basic', 'width');
            }

            if (dialog.getValueOf('tab-basic', 'height').length > 0) {
                height = dialog.getValueOf('tab-basic', 'height');
            }

            div_container.setAttribute('class', css);
            div_container.setAttribute('width', width);
            div_container.setAttribute('height', height);

            // Auto-detect if youtube, vimeo or dailymotion url
            var url = detect(dialog.getValueOf('tab-basic', 'url_video'));
            // Create iframe with specific url
            if(url==1){
                var iframe = new CKEDITOR.dom.element.createFromHtml('<video controls class="'+ css +'" width="' + width+'" height="' + height+'" ><source src="' + url + '" type="video/mp4">Your browser does not support the video tag.</video>');
                div_container.append(iframe);
                editor.insertElement(div_container);
            }
            else if (url.length > 1) {
                var iframe = new CKEDITOR.dom.element.createFromHtml('<iframe frameborder="0" width="560" height="349" src="' + url + '" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
                div_container.append(iframe);
                editor.insertElement(div_container);
            }
        }
    };
});




// Detect platform and return video ID
function detect(url) {
    var embed_url = '';
    // full youtube url
    if (url.indexOf('youtube') > 0) {
        id = getId(url, "?v=", 3);
        if (id.indexOf('&list=') > 0) {
            lastId = getId(id, "&list=", 6);
            return embed_url = 'https://www.youtube.com/embed/' + id + '?list=' + lastId;
        }
        return embed_url = 'https://www.youtube.com/embed/' + id;
    }
    // tiny youtube url
    if (url.indexOf('youtu.be') > 0) {
        id = getId(url);
        // if this is a playlist
        if (id.indexOf('&list=') > 0) {
            lastId = getId(id, "&list=", 6);
            return embed_url = 'https://www.youtube.com/embed/' + id + '?list=' + lastId;
        }
        return embed_url = 'https://www.youtube.com/embed/' + id;
    }
    // full vimeo url
    if (url.indexOf('vimeo') > 0) {
        id = getId(url);
        return embed_url = 'https://player.vimeo.com/video/' + id + '?badge=0';
    }
    // full dailymotion url
    if (url.indexOf('dailymotion') > 0) {
        // if this is a playlist (jukebox)
        if (url.indexOf('/playlist/') > 0) {
            id = url.substring(url.lastIndexOf('/playlist/') + 10, url.indexOf("/1#video="));
            console.log(id);
            return embed_url = 'https://www.dailymotion.com/widget/jukebox?list[]=%2Fplaylist%2F' + id + '%2F1&&autoplay=0&mute=0';
        } else {
            id = getId(url);
        }
        return embed_url = 'https://www.dailymotion.com/embed/video/' + id;
    }
    // tiny dailymotion url
    if (url.indexOf('dai.ly') > 0) {
        id = getId(url);
        return embed_url = 'https://www.dailymotion.com/embed/video/' + id;
    }
    return 1;
}

// Return video ID from URL
function getId(url, string = "/", index = 1) {
    return url.substring(url.lastIndexOf(string) + index, url.length);
}