import { BaseEdge, EdgeProps, getStraightPath } from '@xyflow/react';

export default function PerimeterEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    style,
    markerEnd,
    data,
}: EdgeProps) {
    const sourceRadius = (data?.sourceRadius as number) || 0;
    const targetRadius = (data?.targetRadius as number) || 0;

    const dx = targetX - sourceX;
    const dy = targetY - sourceY;
    const angle = Math.atan2(dy, dx);

    // Calculate boundary intersection points
    const startX = sourceX + Math.cos(angle) * sourceRadius;
    const startY = sourceY + Math.sin(angle) * sourceRadius;

    const endX = targetX - Math.cos(angle) * targetRadius;
    const endY = targetY - Math.sin(angle) * targetRadius;

    const [edgePath] = getStraightPath({
        sourceX: startX,
        sourceY: startY,
        targetX: endX,
        targetY: endY,
    });

    return (
        <BaseEdge
            id={id}
            path={edgePath}
            style={style}
            markerEnd={markerEnd}
        />
    );
}
