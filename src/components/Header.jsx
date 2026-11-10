import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Header({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
      isActive
        ? "bg-sky-500 text-white"
        : "text-sky-600 hover:bg-sky-50"
    }`;

  return (
    <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="max-w-xl mx-auto flex items-center justify-between px-4 h-14">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-sky-500">
          Twitter
        </Link>

     
        {user ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <img
                src="/profile.png"
                alt={user.username}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm font-semibold text-gray-900">
                @{user.username}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-1.5 rounded-full text-sm font-semibold border border-gray-300 text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors cursor-pointer"
            >
              Çıkış
            </button>
          </div>
        ) : (
          <nav className="flex items-center gap-2">
            <NavLink to="/login" className={linkClass}>
              Giriş Yap
            </NavLink>
            <NavLink to="/register" className={linkClass}>
              Kayıt Ol
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
}