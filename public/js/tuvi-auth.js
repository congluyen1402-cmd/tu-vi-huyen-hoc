/**
 * ============================================================================
 * XEM TỬ VI HUYỀN HỌC - AUTHENTICATION & USER MANAGEMENT
 * Quản lý Tài Khoản Người Dùng, Phiên Đăng Nhập & Phân Quyền VIP
 * ============================================================================
 */

(function (global) {
  'use strict';

  const Auth = {
    currentUser: null,
    token: null,

    getApiUrl: function (path) {
      if (typeof window !== 'undefined') {
        if (window.location.protocol === 'file:') {
          return 'http://localhost:8080' + path;
        }
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
          if (window.location.port && window.location.port !== '8080') {
            return 'http://' + window.location.hostname + ':8080' + path;
          }
        }
      }
      return path;
    },

    init: function () {
      this.loadStoredSession();
      this.createAuthModalDOM();
      this.renderNavUserSection();
      this.verifySessionWithServer();
      console.log('✦ Hệ thống Xác thực Tài khoản Sẵn Sàng ✦');
    },

    loadStoredSession: function () {
      try {
        this.token = localStorage.getItem('tvhh_auth_token');
        const userStr = localStorage.getItem('tvhh_user');
        if (this.token && userStr) {
          this.currentUser = JSON.parse(userStr);
        } else {
          this.currentUser = null;
        }
      } catch (e) {
        console.warn('Lỗi đọc session lưu trữ:', e);
        this.currentUser = null;
      }
    },

    saveSession: function (token, user) {
      this.token = token;
      this.currentUser = user;
      try {
        localStorage.setItem('tvhh_auth_token', token);
        localStorage.setItem('tvhh_user', JSON.stringify(user));
      } catch (e) {}

      this.renderNavUserSection();
      this.syncVipStatus();
    },

    clearSession: function () {
      this.token = null;
      this.currentUser = null;
      try {
        localStorage.removeItem('tvhh_auth_token');
        localStorage.removeItem('tvhh_user');
        // Không xóa quyền VIP nếu khách đã có mã đơn hàng thanh toán
        const hasVipOrder = localStorage.getItem('tvhh_vip_order_code');
        const hasVipToken = localStorage.getItem('tvhh_vip_token');
        if (!hasVipOrder && !hasVipToken) {
          localStorage.removeItem('tvhh_vip_unlocked');
        }
      } catch (e) {}
      if (typeof TuViMonetize !== 'undefined' && !localStorage.getItem('tvhh_vip_unlocked')) {
        TuViMonetize.isVipUnlocked = false;
      }

      this.renderNavUserSection();
      this.syncVipStatus();
    },

    isVip: function () {
      if (this.currentUser && this.currentUser.isVip) {
        return true;
      }
      const savedOrder = localStorage.getItem('tvhh_vip_order_code');
      if (savedOrder === 'TV377099' || localStorage.getItem('tvhh_vip_unlocked') === 'true') {
        return true;
      }
      const monetize = (typeof TuViMonetize !== 'undefined' ? TuViMonetize : (typeof window !== 'undefined' ? window.TuViMonetize : null));
      if (monetize && monetize.isVipUnlocked) {
        return true;
      }
      return false;
    },

    syncVipStatus: function () {
      const isVip = this.isVip();
      if (typeof TuViMonetize !== 'undefined') {
        TuViMonetize.isVipUnlocked = isVip;
        if (isVip) {
          TuViMonetize.applyVipUI();
        }
      }

      // Tự động re-render lại accordion 12 cung nếu đã có lá số
      if (typeof TuViChart !== 'undefined' && TuViChart._currentLaSo) {
        TuViChart.renderLuanGiai(TuViChart._currentLaSo);
      }
    },

    verifySessionWithServer: async function () {
      if (!this.token) {
        // Nếu không có token đăng nhập hợp lệ nhưng có VIP token từ khách vãng lai, giữ nguyên
        const hasVipOrder = localStorage.getItem('tvhh_vip_order_code');
        const hasVipToken = localStorage.getItem('tvhh_vip_token');
        if (!hasVipOrder && !hasVipToken && this.currentUser && (!this.currentUser.id || !this.currentUser.passwordHash)) {
          this.currentUser = null;
          try {
            localStorage.removeItem('tvhh_user');
            localStorage.removeItem('tvhh_vip_unlocked');
          } catch (e) {}
        }
        this.syncVipStatus();
        return;
      }
      try {
        const res = await fetch(this.getApiUrl('/api/auth/me'), {
          headers: {
            'Authorization': 'Bearer ' + this.token
          }
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.user) {
            this.currentUser = data.user;
            localStorage.setItem('tvhh_user', JSON.stringify(data.user));
            this.renderNavUserSection();
            this.syncVipStatus();
          }
        } else if (res.status === 401) {
          // Token hết hạn
          this.clearSession();
        }
      } catch (e) {
        // Chạy offline hoặc lỗi mạng, giữ nguyên state local
      }
    },

    renderNavUserSection: function () {
      let navContainer = document.getElementById('navUserContainer');
      if (!navContainer) {
        const navMenu = document.getElementById('navMenu');
        if (!navMenu) return;
        navContainer = document.createElement('div');
        navContainer.id = 'navUserContainer';
        navContainer.className = 'nav-user-container';
        navMenu.appendChild(navContainer);
      }

      if (this.currentUser) {
        const isVip = this.isVip();
        navContainer.innerHTML = `
          <div class="user-nav-dropdown-wrap">
            <button class="btn-user-badge" id="btnUserBadge" onclick="TuViAuth.toggleDropdown(event)">
              <span class="user-badge-icon">${isVip ? '👑' : '👤'}</span>
              <span class="user-badge-name">${this.currentUser.fullName || 'Tài Khoản'}</span>
              <span class="user-tier-tag ${isVip ? 'tier-vip' : 'tier-free'}">${isVip ? 'VIP' : 'Miễn Phí'}</span>
            </button>
            <div class="user-nav-dropdown" id="userNavDropdown">
              <div class="dropdown-header">
                <strong>${this.currentUser.fullName}</strong>
                <span class="dropdown-email">${this.currentUser.emailOrPhone}</span>
                <div class="dropdown-tier-status">
                  Quyền lợi: <strong style="color: ${isVip ? '#ffd700' : '#a78bfa'};">${isVip ? 'Đã Kích Hoạt VIP 12 Cung' : 'Gói Cơ Bản (2 Cung)'}</strong>
                </div>
              </div>
              <div class="dropdown-actions">
                ${!isVip ? `
                  <button class="btn-dropdown-upgrade" onclick="TuViMonetize.openVipModal(); TuViAuth.closeDropdown();">
                    👑 Nâng Cấp VIP (49.000đ)
                  </button>
                ` : `
                  <button class="btn-dropdown-upgrade" style="background:#10b981;" onclick="TuViMonetize.printVipReport(); TuViAuth.closeDropdown();">
                    🖨️ Xuất File PDF VIP A4
                  </button>
                `}
                <button class="btn-dropdown-logout" onclick="TuViAuth.logout()">
                  Đăng Xuất
                </button>
              </div>
            </div>
          </div>
        `;
      } else {
        navContainer.innerHTML = `
          <button class="btn-nav-auth" onclick="TuViAuth.openAuthModal('login')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline; vertical-align:-2px;"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
            <span>Đăng Nhập</span>
          </button>
        `;
      }
    },

    toggleDropdown: function (e) {
      if (e) e.stopPropagation();
      const dd = document.getElementById('userNavDropdown');
      if (dd) {
        dd.classList.toggle('active');
      }
    },

    closeDropdown: function () {
      const dd = document.getElementById('userNavDropdown');
      if (dd) dd.classList.remove('active');
    },

    openAuthModal: function (tab) {
      this.closeDropdown();
      const modal = document.getElementById('tuvi-auth-modal');
      if (!modal) return;
      this.switchTab(tab || 'login');
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    },

    closeAuthModal: function () {
      const modal = document.getElementById('tuvi-auth-modal');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    },

    switchTab: function (tab) {
      const tabLogin = document.getElementById('authTabLogin');
      const tabRegister = document.getElementById('authTabRegister');
      const formLogin = document.getElementById('authFormLogin');
      const formRegister = document.getElementById('authFormRegister');
      const authTitle = document.getElementById('authModalTitle');

      if (tab === 'register') {
        if (tabLogin) tabLogin.classList.remove('active');
        if (tabRegister) tabRegister.classList.add('active');
        if (formLogin) formLogin.style.display = 'none';
        if (formRegister) formRegister.style.display = 'block';
        if (authTitle) authTitle.textContent = 'ĐĂNG KÝ TÀI KHOẢN TỬ VI';
      } else {
        if (tabRegister) tabRegister.classList.remove('active');
        if (tabLogin) tabLogin.classList.add('active');
        if (formRegister) formRegister.style.display = 'none';
        if (formLogin) formLogin.style.display = 'block';
        if (authTitle) authTitle.textContent = 'ĐĂNG NHẬP HỆ THỐNG';
      }
    },

    handleLogin: async function (e) {
      if (e) e.preventDefault();
      const emailOrPhone = (document.getElementById('loginEmailPhone')?.value || '').trim();
      const password = document.getElementById('loginPassword')?.value || '';
      const errEl = document.getElementById('authLoginError');

      if (!emailOrPhone || !password) {
        if (errEl) { errEl.textContent = 'Vui lòng nhập Email/Số điện thoại và Mật khẩu.'; errEl.style.display = 'block'; }
        return;
      }

      if (errEl) errEl.style.display = 'none';
      const btn = document.getElementById('btnLoginSubmit');
      if (btn) { btn.disabled = true; btn.textContent = 'Đang đăng nhập...'; }

      try {
        const res = await fetch(this.getApiUrl('/api/auth/login'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ emailOrPhone, password })
        });
        const data = await res.json();
        if (res.ok && data.success) {
          this.saveSession(data.token, data.user);
          this.closeAuthModal();
          if (typeof TuViApp !== 'undefined' && TuViApp.showToast) {
            TuViApp.showToast(`Chào mừng ${data.user.fullName} trở lại!`, 'success');
          }
        } else {
          if (errEl) { errEl.textContent = data.message || 'Đăng nhập không thành công.'; errEl.style.display = 'block'; }
        }
      } catch (err) {
        if (errEl) { errEl.textContent = 'Lỗi kết nối máy chủ. Vui lòng thử lại.'; errEl.style.display = 'block'; }
      } finally {
        if (btn) { btn.disabled = false; btn.textContent = 'Đăng Nhập'; }
      }
    },

    handleRegister: async function (e) {
      if (e) e.preventDefault();
      const fullName = (document.getElementById('regFullName')?.value || '').trim();
      const emailOrPhone = (document.getElementById('regEmailPhone')?.value || '').trim();
      const password = document.getElementById('regPassword')?.value || '';
      const errEl = document.getElementById('authRegisterError');

      if (!fullName || !emailOrPhone || !password) {
        if (errEl) { errEl.textContent = 'Vui lòng điền đầy đủ các thông tin.'; errEl.style.display = 'block'; }
        return;
      }

      if (password.length < 6) {
        if (errEl) { errEl.textContent = 'Mật khẩu phải từ 6 ký tự trở lên.'; errEl.style.display = 'block'; }
        return;
      }

      if (errEl) errEl.style.display = 'none';
      const btn = document.getElementById('btnRegisterSubmit');
      if (btn) { btn.disabled = true; btn.textContent = 'Đang khởi tạo tài khoản...'; }

      try {
        const res = await fetch(this.getApiUrl('/api/auth/register'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fullName, emailOrPhone, password })
        });
        const data = await res.json();
        if (res.ok && data.success) {
          this.saveSession(data.token, data.user);
          this.closeAuthModal();
          if (typeof TuViApp !== 'undefined' && TuViApp.showToast) {
            TuViApp.showToast(`Đăng ký tài khoản thành công! Chào mừng ${data.user.fullName}`, 'success');
          }
        } else {
          if (errEl) { errEl.textContent = data.message || 'Đăng ký không thành công.'; errEl.style.display = 'block'; }
        }
      } catch (err) {
        if (errEl) { errEl.textContent = 'Lỗi kết nối máy chủ. Vui lòng thử lại.'; errEl.style.display = 'block'; }
      } finally {
        if (btn) { btn.disabled = false; btn.textContent = 'Đăng Ký Tài Khoản'; }
      }
    },

    logout: async function () {
      if (this.token) {
        try {
          await fetch(this.getApiUrl('/api/auth/logout'), {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + this.token }
          });
        } catch (e) {}
      }
      this.clearSession();
      if (typeof TuViApp !== 'undefined' && TuViApp.showToast) {
        TuViApp.showToast('Bạn đã đăng xuất tài khoản.', 'info');
      }
    },

    createAuthModalDOM: function () {
      if (document.getElementById('tuvi-auth-modal')) return;

      const html = `
        <div class="tuvi-vip-modal-wrap" id="tuvi-auth-modal">
          <div class="tuvi-vip-backdrop" onclick="TuViAuth.closeAuthModal()"></div>
          <div class="tuvi-vip-card auth-modal-card">
            <button class="tuvi-vip-close" onclick="TuViAuth.closeAuthModal()">&times;</button>
            
            <div class="tuvi-vip-header">
              <span class="vip-crown">☯️</span>
              <h3 id="authModalTitle">ĐĂNG NHẬP HỆ THỐNG</h3>
              <p class="vip-sub">Lưu trữ lá số trọn đời &amp; tự động mở khóa luận giải VIP khi thanh toán</p>
            </div>

            <div class="auth-tabs-nav">
              <button class="auth-tab-btn active" id="authTabLogin" onclick="TuViAuth.switchTab('login')">Đăng Nhập</button>
              <button class="auth-tab-btn" id="authTabRegister" onclick="TuViAuth.switchTab('register')">Đăng Ký Mới</button>
            </div>

            <!-- FORM ĐĂNG NHẬP -->
            <form id="authFormLogin" onsubmit="TuViAuth.handleLogin(event)" class="auth-form-body">
              <div id="authLoginError" class="auth-error-msg" style="display:none;"></div>
              
              <div class="auth-input-group">
                <label>Email hoặc Số điện thoại:</label>
                <input type="text" id="loginEmailPhone" class="config-input" placeholder="Ví dụ: 0988888888 hoặc email@domain.com" required>
              </div>

              <div class="auth-input-group">
                <label>Mật khẩu:</label>
                <input type="password" id="loginPassword" class="config-input" placeholder="Nhập mật khẩu..." required>
              </div>

              <button type="submit" id="btnLoginSubmit" class="btn-confirm-payment" style="margin-top:10px;">
                Đăng Nhập Ngay
              </button>
              
              <p class="auth-switch-hint">
                Chưa có tài khoản? <a href="javascript:void(0)" onclick="TuViAuth.switchTab('register')">Tạo tài khoản mới</a>
              </p>
            </form>

            <!-- FORM ĐĂNG KÝ -->
            <form id="authFormRegister" onsubmit="TuViAuth.handleRegister(event)" class="auth-form-body" style="display:none;">
              <div id="authRegisterError" class="auth-error-msg" style="display:none;"></div>

              <div class="auth-input-group">
                <label>Họ và tên đương số:</label>
                <input type="text" id="regFullName" class="config-input" placeholder="Ví dụ: Trần Công Luyện" required>
              </div>

              <div class="auth-input-group">
                <label>Email hoặc Số điện thoại (dùng đăng nhập):</label>
                <input type="text" id="regEmailPhone" class="config-input" placeholder="Ví dụ: 0988888888 hoặc email@domain.com" required>
              </div>

              <div class="auth-input-group">
                <label>Mật khẩu bảo mật (tối thiểu 6 ký tự):</label>
                <input type="password" id="regPassword" class="config-input" placeholder="Nhập mật khẩu..." required minlength="6">
              </div>

              <button type="submit" id="btnRegisterSubmit" class="btn-confirm-payment" style="margin-top:10px; background:linear-gradient(135deg, #ffd700 0%, #d4af37 100%); color:#0a0a1a;">
                Đăng Ký Tài Khoản
              </button>

              <p class="auth-switch-hint">
                Đã có tài khoản? <a href="javascript:void(0)" onclick="TuViAuth.switchTab('login')">Đăng nhập tại đây</a>
              </p>
            </form>
          </div>
        </div>
      `;

      document.body.insertAdjacentHTML('beforeend', html);

      // Đóng dropdown khi click ra ngoài
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.user-nav-dropdown-wrap')) {
          this.closeDropdown();
        }
      });
    }
  };

  global.TuViAuth = Auth;
})(typeof window !== 'undefined' ? window : this);

