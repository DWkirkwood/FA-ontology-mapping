import { useState } from 'react';

interface SafesRingProps {
    data: {
        innerRadius: number;
        outerRadius: number;
        onSegmentClick?: (tag: string) => void;
    };
}

export default function SafesRing({ data }: SafesRingProps) {
    const innerR = data.innerRadius;
    const outerR = data.outerRadius;
    const onSegmentClick = data.onSegmentClick;
    const size = outerR * 2;
    const cx = outerR;
    const cy = outerR;
    const midR = (innerR + outerR) / 2;

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Clock angle to radians (0° = top/12 o'clock, clockwise)
    const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180;

    // Five Safes + Impacts and Value Return — clockwise from 12 o'clock, light blue → dark blue
    const segments = [
        { label: 'Safe Projects', tag: 'Safe Projects', startAngle: 0, endAngle: 60, color: 'rgba(219, 234, 254, 0.8)', hoverColor: 'rgba(191, 219, 254, 0.95)' },
        { label: 'Safe People', tag: 'Safe People', startAngle: 60, endAngle: 120, color: 'rgba(191, 219, 254, 0.8)', hoverColor: 'rgba(147, 197, 253, 0.95)' },
        { label: 'Safe Data', tag: 'Safe Data', startAngle: 120, endAngle: 180, color: 'rgba(147, 197, 253, 0.85)', hoverColor: 'rgba(96, 165, 250, 0.95)' },
        { label: 'Safe Settings', tag: 'Safe Settings', startAngle: 180, endAngle: 240, color: 'rgba(96, 165, 250, 0.85)', hoverColor: 'rgba(59, 130, 246, 0.95)' },
        { label: 'Safe Outputs', tag: 'Safe Outputs', startAngle: 240, endAngle: 300, color: 'rgba(59, 130, 246, 0.9)', hoverColor: 'rgba(37, 99, 235, 0.95)' },
        { label: 'Impacts & Value Return', tag: null, startAngle: 300, endAngle: 360, color: 'rgba(30, 58, 138, 0.95)', hoverColor: 'rgba(23, 37, 84, 0.98)' },
    ];

    // Build an annular arc SVG path
    const arcPath = (startDeg: number, endDeg: number, r1: number, r2: number) => {
        const s = toRad(startDeg);
        const e = toRad(endDeg);
        const ox1 = cx + r2 * Math.cos(s);
        const oy1 = cy + r2 * Math.sin(s);
        const ox2 = cx + r2 * Math.cos(e);
        const oy2 = cy + r2 * Math.sin(e);
        const ix2 = cx + r1 * Math.cos(e);
        const iy2 = cy + r1 * Math.sin(e);
        const ix1 = cx + r1 * Math.cos(s);
        const iy1 = cy + r1 * Math.sin(s);
        const la = (endDeg - startDeg) > 180 ? 1 : 0;
        return `M ${ox1} ${oy1} A ${r2} ${r2} 0 ${la} 1 ${ox2} ${oy2} L ${ix2} ${iy2} A ${r1} ${r1} 0 ${la} 0 ${ix1} ${iy1} Z`;
    };

    return (
        <div style={{ width: size, height: size, pointerEvents: 'none' }}>
            <svg width={size} height={size}>
                {/* Render filled arc segments */}
                {segments.map((seg, i) => {
                    const isHovered = hoveredIndex === i;
                    const isClickable = !!seg.tag && !!onSegmentClick;
                    return (
                        <path
                            key={`seg-${i}`}
                            d={arcPath(seg.startAngle, seg.endAngle, innerR, outerR)}
                            fill={isHovered ? seg.hoverColor : seg.color}
                            stroke="rgba(255, 255, 255, 0.9)"
                            strokeWidth="1.5"
                            style={{
                                pointerEvents: 'auto',
                                cursor: isClickable ? 'pointer' : 'default',
                                transition: 'fill 0.2s ease',
                            }}
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onClick={(e) => {
                                if (seg.tag && onSegmentClick) {
                                    e.stopPropagation();
                                    onSegmentClick(seg.tag);
                                }
                            }}
                        />
                    );
                })}

                {/* Render text labels — positioned at midpoint, rotated tangent to arc */}
                {segments.map((seg, i) => {
                    const midAngleDeg = (seg.startAngle + seg.endAngle) / 2;
                    const midAngleRad = toRad(midAngleDeg);
                    const textX = cx + midR * Math.cos(midAngleRad);
                    const textY = cy + midR * Math.sin(midAngleRad);

                    let rotation = midAngleDeg;
                    if (midAngleDeg > 90 && midAngleDeg <= 270) {
                        rotation += 180;
                    }

                    const isDark = i >= 4;

                    return (
                        <text
                            key={`lbl-${i}`}
                            x={textX}
                            y={textY}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize={i === 5 ? '8' : '10'}
                            fontWeight="700"
                            fill={isDark ? '#ffffff' : '#1e3a8a'}
                            letterSpacing="1.5"
                            transform={`rotate(${rotation}, ${textX}, ${textY})`}
                            style={{
                                textTransform: 'uppercase',
                                fontFamily: 'Inter, system-ui, sans-serif',
                                pointerEvents: 'none',
                            }}
                        >
                            {seg.label}
                        </text>
                    );
                })}
            </svg>
        </div>
    );
}
