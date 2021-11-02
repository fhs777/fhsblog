export function throttle(fn, delay) {
    let last;
    return function() {
        let that = this;
        let _args = arguments;
        let now = +new Date()
        if(last && last + delay > now ) {
            return
        }
        else {
            last = now
            fn.apply(that,_args)
        }
    }
}


export function imgLazyLoad(imgList, imgcount) {
    console.log('imgla')
    console.log(imgList, imgcount)
    /*let deleteIndex = []
    
    imgList.forEach((item, index) => {
    let rect = item.getBoundingClientRect()
    //console.log(s.top)
    if((rect.top + window.scrollY - 720) < document.documentElement.scrollTop || document.body.scrollTop) {
        item.src = item.dataset.src
        console.log(item.dataset.src)
        deleteIndex.push(index)
        imgcount--;
        if(imgcount == 0) {
          //window.removeEventListener('scroll', this.imgLazyLoad)
          }
        }
        })
        imgList = imgList.filter((item, index) => !deleteIndex.includes(index))
     */ 
    }