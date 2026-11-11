<script id="lasoHistoryCard" type="text/x-template">
    <a class="float-left m-r-10" href="${item.path}">
        <div class="preview-la-so-item">
            <img class="preview-la-so-background" src="/public/images/la_so.png">
            <div class="overlay-con-giap ${Utils.sinceTime(item.tuoi)} ${Utils.getColorNguHanhClass(item.menh)}"></div>
            <div class="preview-la-so-header p-l-10 p-r-10">
                <p class="txt-content-mid text-white mb-0">${item.name}</p>
                <p class="txt-sub-content text-white mb-0">${item.info}</p>
            </div>
            <div class="preview-la-so-body">
                <p class="txt-content-bold mb-0">Bản Mệnh</p>
                <p class="txt-content mb-0">${item.cucMenh }</p>
                
                <p class="txt-content-bold color-blue mb-0">${item.canLuong}</p>
            </div>
        </div>
    </a>
</script>