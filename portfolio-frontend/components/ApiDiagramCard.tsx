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

const themeClasses = {
  commerce: {
    gateway: "fill-orange-500/5 dark:fill-orange-500/10 stroke-orange-500/30 dark:stroke-orange-500/40 text-orange-950 dark:text-orange-200",
    modules: "fill-orange-500/[0.02] dark:fill-orange-500/[0.04] stroke-orange-500/20 dark:stroke-orange-500/30",
    moduleItem: "fill-brand-surface stroke-brand-border/80 dark:stroke-brand-border/60 text-brand-navy",
    data: "fill-orange-500/5 dark:fill-orange-500/10 stroke-orange-500/30 dark:stroke-orange-500/40 text-orange-950 dark:text-orange-200",
    arrow: "stroke-orange-500 dark:stroke-orange-400",
    marker: "fill-orange-500 dark:fill-orange-400",
  },
  banking: {
    gateway: "fill-indigo-500/5 dark:fill-indigo-500/10 stroke-indigo-500/30 dark:stroke-indigo-500/40 text-indigo-950 dark:text-indigo-200",
    modules: "fill-indigo-500/[0.02] dark:fill-indigo-500/[0.04] stroke-indigo-500/20 dark:stroke-indigo-500/30",
    moduleItem: "fill-brand-surface stroke-brand-border/80 dark:stroke-brand-border/60 text-brand-navy",
    data: "fill-indigo-500/5 dark:fill-indigo-500/10 stroke-indigo-500/30 dark:stroke-indigo-500/40 text-indigo-950 dark:text-indigo-200",
    arrow: "stroke-indigo-500 dark:stroke-indigo-400",
    marker: "fill-indigo-500 dark:fill-indigo-400",
  },
  healthcare: {
    gateway: "fill-cyan-500/5 dark:fill-cyan-500/10 stroke-cyan-500/30 dark:stroke-cyan-500/40 text-cyan-950 dark:text-cyan-200",
    modules: "fill-cyan-500/[0.02] dark:fill-cyan-500/[0.04] stroke-cyan-500/20 dark:stroke-cyan-500/30",
    moduleItem: "fill-brand-surface stroke-brand-border/80 dark:stroke-brand-border/60 text-brand-navy",
    data: "fill-cyan-500/5 dark:fill-cyan-500/10 stroke-cyan-500/30 dark:stroke-cyan-500/40 text-cyan-950 dark:text-cyan-200",
    arrow: "stroke-cyan-500 dark:stroke-cyan-400",
    marker: "fill-cyan-500 dark:fill-cyan-400",
  },
  assessment: {
    gateway: "fill-emerald-500/5 dark:fill-emerald-500/10 stroke-emerald-500/30 dark:stroke-emerald-500/40 text-emerald-950 dark:text-emerald-200",
    modules: "fill-emerald-500/[0.02] dark:fill-emerald-500/[0.04] stroke-emerald-500/20 dark:stroke-emerald-500/30",
    moduleItem: "fill-brand-surface stroke-brand-border/80 dark:stroke-brand-border/60 text-brand-navy",
    data: "fill-emerald-500/5 dark:fill-emerald-500/10 stroke-emerald-500/30 dark:stroke-emerald-500/40 text-emerald-950 dark:text-emerald-200",
    arrow: "stroke-emerald-500 dark:stroke-emerald-400",
    marker: "fill-emerald-500 dark:fill-emerald-400",
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
  const theme = themeClasses[diagram.theme];
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

  return (
    <div className="mt-2 overflow-x-auto rounded-xl border border-brand-border/60 bg-brand-bg/30 shadow-inner">
      <svg
        viewBox={`0 0 ${SVG_WIDTH} ${svgHeight}`}
        className="h-auto min-w-[720px] w-full sm:min-w-0"
        role="img"
        aria-label={`${diagram.gatewayLabel} API architecture diagram`}
      >
        <defs>
          <marker
            id={markerId}
            markerWidth="8"
            markerHeight="8"
            refX="7"
            refY="3.5"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,7 L7,3.5 z" className={`${theme.marker} transition-colors duration-300`} />
          </marker>
        </defs>

        {/* Transparent background to blend naturally with both Light and Dark mode cards */}
        <rect x="0" y="0" width={SVG_WIDTH} height={svgHeight} className="fill-transparent" />

        {/* Client Box */}
        <g className="group/client cursor-default">
          <rect
            x={250}
            y={20}
            rx={10}
            width={260}
            height={42}
            className="fill-brand-surface stroke-brand-border transition-colors duration-300 group-hover/client:stroke-brand-blue group-hover/client:fill-brand-blue/5"
          />
          <text
            x={380}
            y={45}
            textAnchor="middle"
            fontSize="12"
            fontWeight="750"
            className="fill-brand-navy transition-colors duration-300 group-hover/client:fill-brand-blue"
            fontFamily="var(--font-dm-sans), sans-serif"
          >
            {ellipsize(diagram.clientLabel, 40)}
          </text>
        </g>

        {/* Link from Client to Gateway */}
        <line
          x1={380}
          y1={62}
          x2={380}
          y2={84}
          className={`${theme.arrow} transition-colors duration-300`}
          strokeWidth={1.6}
          markerEnd={`url(#${markerId})`}
        />

        {/* Gateway Box */}
        <g className="group/gateway cursor-default">
          <rect
            x={220}
            y={84}
            rx={10}
            width={320}
            height={44}
            className={`${theme.gateway} transition-colors duration-300 group-hover/gateway:stroke-brand-blue group-hover/gateway:fill-brand-blue/5`}
          />
          <text
            x={380}
            y={110}
            textAnchor="middle"
            fontSize="12.5"
            fontWeight="750"
            className="fill-brand-navy transition-colors duration-300 group-hover/gateway:fill-brand-blue"
            fontFamily="var(--font-dm-sans), sans-serif"
          >
            {ellipsize(diagram.gatewayLabel, 42)}
          </text>
        </g>

        {/* Link from Gateway to Modules Block */}
        <line
          x1={380}
          y1={128}
          x2={380}
          y2={148}
          className={`${theme.arrow} transition-colors duration-300`}
          strokeWidth={1.6}
          markerEnd={`url(#${markerId})`}
        />

        {/* Modules Block Container */}
        <rect
          x={PADDING_X}
          y={modulesY}
          rx={12}
          width={SVG_WIDTH - PADDING_X * 2}
          height={modulesBlockH}
          className={`${theme.modules} transition-colors duration-300`}
        />
        <text
          x={PADDING_X + 16}
          y={modulesY + 18}
          fontSize="10"
          fontWeight="700"
          className="fill-slate-400 dark:fill-slate-500 font-mono tracking-wider"
          letterSpacing="0.8px"
        >
          ROUTE GROUPS
        </text>

        {/* Route Group Items */}
        {rows.map((row, rowIndex) =>
          row.map((item, colIndex) => {
            const x = PADDING_X + colIndex * (moduleBoxW + MODULE_GAP_X);
            const y = modulesY + 28 + rowIndex * (MODULE_BOX_H + MODULE_GAP_Y);
            return (
              <g key={`${item}-${rowIndex}-${colIndex}`} className="group/module cursor-default">
                <rect
                  x={x}
                  y={y}
                  rx={6}
                  width={moduleBoxW}
                  height={MODULE_BOX_H}
                  className={`${theme.moduleItem} transition-colors duration-300 group-hover/module:stroke-brand-blue group-hover/module:fill-brand-blue/5`}
                />
                <text
                  x={x + moduleBoxW / 2}
                  y={y + 21}
                  textAnchor="middle"
                  fontSize="10.5"
                  fontWeight="600"
                  className="fill-brand-navy transition-colors duration-300 group-hover/module:fill-brand-blue"
                  fontFamily="var(--font-dm-sans), sans-serif"
                >
                  {ellipsize(item)}
                </text>
              </g>
            );
          }),
        )}

        {/* Link from Modules Block to Data Layer */}
        <line
          x1={380}
          y1={modulesY + modulesBlockH}
          x2={380}
          y2={dataY}
          className={`${theme.arrow} transition-colors duration-300`}
          strokeWidth={1.6}
          markerEnd={`url(#${markerId})`}
        />

        {/* Data & Control Layer Box */}
        <g className="group/data cursor-default">
          <rect
            x={120}
            y={dataY}
            rx={12}
            width={520}
            height={dataH}
            className={`${theme.data} transition-colors duration-300 group-hover/data:stroke-brand-blue group-hover/data:fill-brand-blue/5`}
          />
          <text
            x={380}
            y={dataY + 22}
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="700"
            className="fill-slate-400 dark:fill-slate-500 font-mono tracking-wider"
            letterSpacing="0.8px"
          >
            DATA AND CONTROL LAYER
          </text>
          <text
            x={380}
            y={dataY + 42}
            textAnchor="middle"
            fontSize="12.5"
            fontWeight="750"
            className="fill-brand-navy transition-colors duration-300 group-hover/data:fill-brand-blue"
            fontFamily="var(--font-dm-sans), sans-serif"
          >
            {ellipsize(diagram.dataLayerLabel, 72)}
          </text>
          {diagram.controlLabel ? (
            <text
              x={380}
              y={dataY + 62}
              textAnchor="middle"
              fontSize="10.5"
              fontWeight="500"
              className="fill-brand-charcoal transition-colors duration-300 group-hover/data:fill-brand-blue/80"
              fontFamily="var(--font-dm-sans), sans-serif"
            >
              {ellipsize(diagram.controlLabel, 78)}
            </text>
          ) : null}
        </g>
      </svg>
    </div>
  );
}
