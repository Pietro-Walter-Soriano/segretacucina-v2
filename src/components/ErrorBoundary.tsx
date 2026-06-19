import React from "react";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Isola i crash di un sottoalbero (es. la scena 3D del Lanyard): se un
 * componente figlio lancia un errore a runtime, qui lo catturiamo e mostriamo
 * il fallback invece di far sparire l'intera pagina (white screen).
 */
export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("ErrorBoundary ha catturato un errore:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
