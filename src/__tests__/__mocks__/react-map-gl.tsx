import React from "react";

export function Map({ children, onClick, ...props }: React.PropsWithChildren<Record<string, unknown>>) {
  return (
    <div data-testid="mapbox-map" onClick={onClick as React.MouseEventHandler} {...props}>
      {children}
    </div>
  );
}

export function Marker({ children, longitude, latitude, ...props }: React.PropsWithChildren<{ longitude: number; latitude: number }>) {
  return (
    <div data-testid={`marker-${longitude}-${latitude}`} {...props}>
      {children}
    </div>
  );
}

export function Source({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) {
  return <div data-testid={`source-${props.id}`}>{children}</div>;
}

export function Layer(props: Record<string, unknown>) {
  return <div data-testid={`layer-${props.id}`} />;
}

export default Map;
