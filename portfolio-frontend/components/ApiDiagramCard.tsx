export type ApiDiagramModel = {
  theme: "commerce" | "banking" | "healthcare" | "assessment";
  clientLabel: string;
  gatewayLabel: string;
  routeGroups: string[];
  dataLayerLabel: string;
  controlLabel?: string;
};

type ApiDiagramCardProps = {
  idPrefix: string;
  diagram: ApiDiagramModel;
};

const SVG_WIDTH = 760;
const PADDING_X = 24;
const MODULE_GAP_X = 12;
const MODULE_GAP_Y = 10;
const MODULE_COLS = 3;
const MODULE_BOX_H = 34;

const themeStyles = {
  commerce: {
    gradStart: "#fff7ed",
    gradEnd: "#ffedd5",
    gatewayStroke: "#fdba74",
    gatewayText: "#9a3412",
    modulesFill: "#fff7ed",
    modulesStroke: "#fdba74",
    moduleItemStroke: "#fed7aa",
    dataFill: "#fff7ed",
    dataStroke: "#fdba74",
    dataHeading: "#9a3412",
    arrow: "#c2410c",
  },
  banking: {
    gradStart: "#eef2ff",
    gradEnd: "#e0e7ff",
    gatewayStroke: "#a5b4fc",
    gatewayText: "#3730a3",
    modulesFill: "#eef2ff",
    modulesStroke: "#c7d2fe",
    moduleItemStroke: "#c7d2fe",
    dataFill: "#eef2ff",
    dataStroke: "#a5b4fc",
    dataHeading: "#3730a3",
    arrow: "#4338ca",
  },
  healthcare: {
    gradStart: "#ecfeff",
    gradEnd: "#cffafe",
    gatewayStroke: "#67e8f9",
    gatewayText: "#155e75",
    modulesFill: "#ecfeff",
    modulesStroke: "#67e8f9",
    moduleItemStroke: "#a5f3fc",
    dataFill: "#ecfeff",
    dataStroke: "#67e8f9",
    dataHeading: "#155e75",
    arrow: "#0e7490",
  },
  assessment: {
    gradStart: "#f0fdf4",
    gradEnd: "#dcfce7",
    gatewayStroke: "#86efac",
    gatewayText: "#166534",
    modulesFill: "#f0fdf4",
    modulesStroke: "#86efac",
    moduleItemStroke: "#bbf7d0",
    dataFill: "#f0fdf4",
    dataStroke: "#86efac",
    dataHeading: "#166534",
    arrow: "#15803d",
  },
} as const;

function chunk<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

function ellipsize(input: string, max = 34): string {
  if (input.length <= max) return input;
  return `${input.slice(0, max - 1)}…`;
}

export default function ApiDiagramCard({ idPrefix, diagram }: ApiDiagramCardProps) {
  const theme = themeStyles[diagram.theme];
  const rows = chunk(diagram.routeGroups, MODULE_COLS);
  const moduleBoxW =
    (SVG_WIDTH - PADDING_X * 2 - MODULE_GAP_X * (MODULE_COLS - 1)) / MODULE_COLS;
  const modulesY = 148;
  const modulesInnerH =
    rows.length * MODULE_BOX_H + Math.max(rows.length - 1, 0) * MODULE_GAP_Y;
  const modulesBlockH = 24 + modulesInnerH + 24;
  const dataY = modulesY + modulesBlockH + 24;
  const dataH = diagram.controlLabel ? 88 : 62;
  const svgHeight = dataY + dataH + 24;

  const markerId = `${idPrefix}-arrow`;
  const gradId = `${idPrefix}-grad`;

  return (
    <div className="mt-2 overflow-hidden rounded-lg border border-brand-charcoal/10 bg-white">
      <svg
        viewBox={`0 0 ${SVG_WIDTH} ${svgHeight}`}
        className="h-auto w-full"
        role="img"
        aria-label={`${diagram.gatewayLabel} API architecture diagram`}
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={theme.gradStart} />
            <stop offset="100%" stopColor={theme.gradEnd} />
          </linearGradient>
          <marker
            id={markerId}
            markerWidth="8"
            markerHeight="8"
            refX="7"
            refY="3.5"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,7 L7,3.5 z" fill={theme.arrow} />
          </marker>
        </defs>

        <rect x="0" y="0" width={SVG_WIDTH} height={svgHeight} fill="#ffffff" />

        <rect
          x={250}
          y={20}
          rx={12}
          width={260}
          height={42}
          fill="#f8fafc"
          stroke="#cbd5e1"
        />
        <text
          x={380}
          y={45}
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill="#0f172a"
          fontFamily="Inter, sans-serif"
        >
          {ellipsize(diagram.clientLabel, 40)}
        </text>

        <line
          x1={380}
          y1={62}
          x2={380}
          y2={84}
          stroke={theme.arrow}
          strokeWidth={1.6}
          markerEnd={`url(#${markerId})`}
        />

        <rect
          x={220}
          y={84}
          rx={12}
          width={320}
          height={44}
          fill={`url(#${gradId})`}
          stroke={theme.gatewayStroke}
        />
        <text
          x={380}
          y={111}
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={theme.gatewayText}
          fontFamily="Inter, sans-serif"
        >
          {ellipsize(diagram.gatewayLabel, 42)}
        </text>

        <line
          x1={380}
          y1={128}
          x2={380}
          y2={148}
          stroke={theme.arrow}
          strokeWidth={1.6}
          markerEnd={`url(#${markerId})`}
        />

        <rect
          x={PADDING_X}
          y={modulesY}
          rx={12}
          width={SVG_WIDTH - PADDING_X * 2}
          height={modulesBlockH}
          fill={theme.modulesFill}
          stroke={theme.modulesStroke}
        />
        <text
          x={PADDING_X + 16}
          y={modulesY + 17}
          fontSize="11"
          fontWeight="700"
          fill="#475569"
          fontFamily="Inter, sans-serif"
          letterSpacing="0.8px"
        >
          ROUTE GROUPS
        </text>

        {rows.map((row, rowIndex) =>
          row.map((item, colIndex) => {
            const x = PADDING_X + colIndex * (moduleBoxW + MODULE_GAP_X);
            const y = modulesY + 28 + rowIndex * (MODULE_BOX_H + MODULE_GAP_Y);
            return (
              <g key={`${item}-${rowIndex}-${colIndex}`}>
                <rect
                  x={x}
                  y={y}
                  rx={8}
                  width={moduleBoxW}
                  height={MODULE_BOX_H}
                  fill="#ffffff"
                  stroke={theme.moduleItemStroke}
                />
                <text
                  x={x + moduleBoxW / 2}
                  y={y + 21}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  fill="#1e293b"
                  fontFamily="Inter, sans-serif"
                >
                  {ellipsize(item)}
                </text>
              </g>
            );
          }),
        )}

        <line
          x1={380}
          y1={modulesY + modulesBlockH}
          x2={380}
          y2={dataY}
          stroke={theme.arrow}
          strokeWidth={1.6}
          markerEnd={`url(#${markerId})`}
        />

        <rect
          x={120}
          y={dataY}
          rx={12}
          width={520}
          height={dataH}
          fill={theme.dataFill}
          stroke={theme.dataStroke}
        />
        <text
          x={380}
          y={dataY + 24}
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={theme.dataHeading}
          fontFamily="Inter, sans-serif"
          letterSpacing="0.8px"
        >
          DATA AND CONTROL LAYER
        </text>
        <text
          x={380}
          y={dataY + 44}
          textAnchor="middle"
          fontSize="12"
          fontWeight="600"
          fill="#0f172a"
          fontFamily="Inter, sans-serif"
        >
          {ellipsize(diagram.dataLayerLabel, 72)}
        </text>
        {diagram.controlLabel ? (
          <text
            x={380}
            y={dataY + 64}
            textAnchor="middle"
            fontSize="11"
            fontWeight="500"
            fill="#334155"
            fontFamily="Inter, sans-serif"
          >
            {ellipsize(diagram.controlLabel, 78)}
          </text>
        ) : null}
      </svg>
    </div>
  );
}
