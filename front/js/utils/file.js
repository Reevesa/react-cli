/**********************************************
 * File utils, deal with file operation.
 * ********************************************
 * @author: Andy.
 * @time: 2017-02-16.
 */

module.exports = {

    /**
     * Convert file into base64 data
     * If it's an image file, compress it if it's to large* 
     * @param  {File}   file File to convert
     * @param  {Function} cb   callback
     */
    convertFile(file) {
        return new Promise(resolve => {
            let reader;

            if (typeof FileReader !== 'undefined') {
                reader = new FileReader();
            } else {
                if (window.FileReader) reader = new window.FileReader();
            }

            reader.onload = evt => {

                let data = evt.target.result;
                
                resolve({ status: 'success', data });

                reader = null;
            };

            reader.onerror = () => {
                                
                resolve({ status: 'error', msg: 'FileReader Error.' });
            };
            reader.readAsDataURL(file);
        });        
    },    

    /**
     * Compress image data
     * @param  {String}   data base64 data
     * @param  {Function} cb   callback
     */
    compressImg(data, cb) {

        const COMPRESS_RATIO = 0.5;
        let img;

        if (typeof Image !== 'undefined') {
            img = new Image();
        } else {
            if (window.Image) img = new window.Image();
        }

        img.onload = () => {

            let w = Math.min(500, img.width);
            let h = img.height * (w / img.width);
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            let drawImage = ctx.drawImage;

            /* eslint-disable max-params */
            ctx.drawImage = function(img, sx, sy, sw, sh, dx, dy, dw, dh) {
                let vertSquashRatio = 1;
                if (arguments.length === 9) { drawImage.call(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio) }
                else if (typeof sw !== 'undefined') { drawImage.call(ctx, img, sx, sy, sw, sh / vertSquashRatio) }
                else { drawImage.call(ctx, img, sx, sy) }
            };
            /* eslint-enable max-params */

            canvas.width = w;
            canvas.height = h;
            ctx.drawImage(img, 0, 0, w, h);

            let base64 = canvas.toDataURL('image/jpeg', COMPRESS_RATIO);

            img = null;
            canvas = null;
            ctx = null;

            cb({ status: 'success', data: base64 });
        };

        img.onerror = () => {
            cb({ status: 'error', msg: 'Compress Error.' });
        };

        img.src = data;
    }
};