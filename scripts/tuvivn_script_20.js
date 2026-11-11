<script id="lasoCard" type="text/x-template">
    <a href="/${item.slug}">
        <div class="preview-la-so-item">
            <img class="preview-la-so-background" src="/public/images/la_so.png">
            <div class="overlay-con-giap ${item.animalType} ${item.color}"></div>
            <div class="preview-la-so-header p-l-10 p-r-10">
                <p class="txt-content-mid text-white mb-0">${item.name}</p>
                <p class="txt-sub-content text-white mb-0">${item.am_duong_cua_ban_menh} - ${item.current_time_full} -
                    ${item.lunar_year}</p>
            </div>
            <div class="preview-la-so-body">
                <div>
                    <p class="txt-content-bold mb-0">Bản Mệnh</p>
                    <p class="txt-content mb-0">${item.loai_hanh_cua_ban_menh} - ${item.cuc_cua_tuoi.name}</p>
                    
                    <p class="txt-content-bold color-blue mb-0">${item.can_xuong}</p>
                </div>
            </div>

            <div class="preview-la-so-activity p-r-10 p-l-10 pb-1">
                <p class="txt-sub-content mb-0">${item.total_view}</p>
                <div class="total-icon icon-views ml-1"></div>
            </div>
        </div>
    </a>
    </script>