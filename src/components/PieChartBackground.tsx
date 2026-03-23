export default function PieChartBackground({ data }: { data: { radius: number } }) {
    const r = data.radius;
    const size = r * 2;
    const cx = r;
    const cy = r;
    const toRad = (d: number) => (d * Math.PI) / 180;

    const sectorPath = (startDeg: number, sweepDeg: number) => {
        const endDeg = startDeg + sweepDeg;
        const x1 = cx + r * Math.cos(toRad(startDeg));
        const y1 = cy + r * Math.sin(toRad(startDeg));
        const x2 = cx + r * Math.cos(toRad(endDeg));
        const y2 = cy + r * Math.sin(toRad(endDeg));
        const largeArc = sweepDeg > 180 ? 1 : 0;
        return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    };

    // Three equal sectors (SVG angles: 0°=right, clockwise)
    // People (top): 210°–330°, Data (lower-right): 330°–90°, Analytics (lower-left): 90°–210°
    const sectors = [
        { start: 210, sweep: 120 },
        { start: 330, sweep: 120 },
        { start: 90, sweep: 120 },
    ];

    const dividerAngles = [210, 330, 90];

    return (
        <div style={{ width: size, height: size, pointerEvents: 'none' }}>
            <svg width={size} height={size}>
                {sectors.map((s, i) => (
                    <path
                        key={i}
                        d={sectorPath(s.start, s.sweep)}
                        fill="rgba(249, 115, 22, 0.08)"
                        stroke="none"
                    />
                ))}
                <circle
                    cx={cx} cy={cy} r={r}
                    fill="none"
                    stroke="rgba(249, 115, 22, 0.35)"
                    strokeWidth="2"
                    strokeDasharray="10 8"
                />
                {dividerAngles.map((deg, i) => (
                    <line
                        key={i}
                        x1={cx} y1={cy}
                        x2={cx + r * Math.cos(toRad(deg))}
                        y2={cy + r * Math.sin(toRad(deg))}
                        stroke="rgba(249, 115, 22, 0.35)"
                        strokeWidth="2"
                        strokeDasharray="10 8"
                    />
                ))}
            </svg>
        </div>
    );
}
