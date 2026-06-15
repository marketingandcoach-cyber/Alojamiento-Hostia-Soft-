import React, { ErrorInfo, ReactNode } from "react";
import { AlertOctagon, RotateCcw, Trash2, HelpCircle } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });
    console.error("ErrorBoundary caught an uncaught React error:", error, errorInfo);
  }

  private handleResetStyle = () => {
    try {
      localStorage.removeItem("editorial_style");
      localStorage.removeItem("editorial_trim_size");
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  private handleResetAll = () => {
    if (confirm("¿Estás seguro de que deseas restablecer por completo la aplicación? Esto borrará tus capítulos guardados localmente.")) {
      try {
        localStorage.clear();
        window.location.reload();
      } catch (e) {
        console.error(e);
      }
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 font-sans">
          <div className="max-w-2xl w-full bg-slate-900 border border-red-500/30 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 via-amber-500 to-red-600"></div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
                <AlertOctagon className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                  ¡Vaya! Se ha detectado un conflicto en el diseño
                </h1>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  React Render Interrupted (Error Boundary Active)
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Esto ocurre ocasionalmente debido a parámetros de estilo obsoletos o corruptos guardados en la memoria local (sesiones previas) o discrepancias de maquetación en el lienzo. Para solucionarlo al instante, haz clic a continuación en <strong>Restaurar Estilos</strong>:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <button
                onClick={this.handleResetStyle}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold px-4 py-3 rounded-xl transition-all shadow-md active:scale-98 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Restaurar Estilos (Recomendado)</span>
              </button>

              <button
                onClick={this.handleResetAll}
                className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-705 border border-slate-700 hover:border-slate-600 text-slate-300 font-medium px-4 py-3 rounded-xl transition-all cursor-pointer"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
                <span>Restablecer Todo</span>
              </button>
            </div>

            <div className="bg-slate-950 rounded-xl border border-slate-800 p-4">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800">
                <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-450 font-mono flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" /> Detalles de Diagnóstico (DPI/UI)
                </span>
                <span className="text-[10px] text-red-400 bg-red-400/5 px-2 py-0.5 rounded-full font-mono border border-red-500/10">
                  {this.state.error?.name || "Error"}
                </span>
              </div>
              <p className="text-xs text-red-300 font-mono whitespace-pre-wrap break-all leading-normal">
                {this.state.error?.message || "Sin mensaje de error disponible."}
              </p>
              {this.state.errorInfo && (
                <div className="mt-2 pt-2 border-t border-slate-900/60">
                  <span className="text-[10px] text-slate-500 font-mono">Stack trace de los componentes:</span>
                  <pre className="text-[9.5px] text-slate-450 font-mono whitespace-pre-wrap break-all mt-1 max-h-36 overflow-y-auto leading-relaxed">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </div>
              )}
            </div>

            <div className="mt-6 text-center">
              <p className="text-[11px] text-slate-500">
                Al restaurar estilos, se restablecerán las fuentes, colores y márgenes predeterminados sin perder ningún borrador.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
