/* =========================================================
   木牛流马 —— 关卡数据
   =========================================================

   地图符号：
     0 = 空地（可走）
     1 = 石墙（不可走）
     2 = 陷阱（踩上 Game Over）
     3 = 终点（需送达所有零件到此处）
     4 = 零件（初始位置）
     5 = 起点标记（渲染用，行走判定用 start 字段）

   方向：'up' | 'right' | 'down' | 'left'

   指令类型：forward | left | right | grab | drop | wait | loop

   三星：
     ★★★ = optimal 指令数
     ★★  = optimal + 2
     ★   = optimal + 4

   ========================================================= */

window.LEVELS = [

/* ============ 第一卷 · 入谷（线性指令教学） ============ */

{
  // —— 第 1 关：入谷（直路教学）——
  id: 'v1-1', volume: 1, index: 1, title: '入谷',
  cols: 6, rows: 4,
  map: [
    [0,0,0,0,0,0],
    [5,0,0,0,0,3],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
  ],
  start: { x: 0, y: 1, dir: 'right' },
  packages: [],          // 无零件，纯走路
  available: ['forward','left','right'],
  maxSlots: 6, optimal: 5,
  winCondition: 'reachGoal',
  hint: '点运行，看木牛流马走路。',
},
{
  // —— 第 2 关：拐弯（90° 转弯）——
  id: 'v1-2', volume: 1, index: 2, title: '拐弯',
  cols: 6, rows: 6,
  map: [
    [5,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,3],
  ],
  start: { x: 0, y: 0, dir: 'right' },
  packages: [],
  available: ['forward','left','right'],
  maxSlots: 12, optimal: 11,
  winCondition: 'reachGoal',
  hint: '先直走，到了头再转向下。',
},
{
  // —— 第 3 关：取石（零件 + 拿取/放下）——
  id: 'v1-3', volume: 1, index: 3, title: '取石',
  cols: 6, rows: 6,
  map: [
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [5,0,0,4,0,3],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
  ],
  start: { x: 0, y: 2, dir: 'right' },
  packages: [{ x: 3, y: 2 }],
  available: ['forward','left','right','grab','drop'],
  maxSlots: 10, optimal: 7,
  winCondition: 'allPackagesDelivered',
  hint: '走到零件处 → 拿取 → 走到终点 → 放下',
},
{
  // —— 第 4 关：双弯（连续转向）——
  id: 'v1-4', volume: 1, index: 4, title: '双弯',
  cols: 7, rows: 5,
  map: [
    [5,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,3],
  ],
  start: { x: 0, y: 0, dir: 'right' },
  packages: [{ x: 4, y: 2 }],
  available: ['forward','left','right','grab','drop'],
  maxSlots: 14, optimal: 14,
  winCondition: 'allPackagesDelivered',
  hint: '绕个大圈把零件带到终点。',
},
{
  // —— 第 5 关：之字（多次 90° 转向）——
  id: 'v1-5', volume: 1, index: 5, title: '之字',
  cols: 8, rows: 5,
  map: [
    [5,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,3],
  ],
  start: { x: 0, y: 0, dir: 'right' },
  packages: [{ x: 6, y: 1 }, { x: 2, y: 3 }],
  available: ['forward','left','right','grab','drop'],
  maxSlots: 32, optimal: 29,
  winCondition: 'allPackagesDelivered',
  hint: '两个零件按顺序搬过去。',
},

/* ============ 第二卷 · 古道（引入石墙和绕行） ============ */

{
  id: 'v2-1', volume: 2, index: 1, title: '绕坡',
  cols: 8, rows: 5,
  map: [
    [5,0,0,1,1,1,0,0],
    [0,0,0,1,1,1,0,0],
    [0,0,0,1,1,1,0,3],
    [0,0,0,1,1,1,0,0],
    [0,0,0,0,0,0,0,0],
  ],
  start: { x: 0, y: 0, dir: 'right' },
  packages: [],
  available: ['forward','left','right'],
  maxSlots: 18, optimal: 16,
  winCondition: 'reachGoal',
  hint: '中间是墙，绕过去。',
},
{
  id: 'v2-2', volume: 2, index: 2, title: '搬运',
  cols: 8, rows: 5,
  map: [
    [5,0,4,1,0,4,0,3],
    [0,0,0,1,0,0,0,0],
    [0,0,0,1,0,0,0,0],
    [0,0,0,1,0,0,0,0],
    [0,0,0,0,0,0,0,0],
  ],
  start: { x: 0, y: 0, dir: 'right' },
  packages: [{ x: 2, y: 0 }, { x: 5, y: 0 }],
  available: ['forward','left','right','grab','drop'],
  maxSlots: 42, optimal: 39,
  winCondition: 'allPackagesDelivered',
  hint: '先绕墙拿左边的，再绕回来拿右边的。',
},
{
  id: 'v2-3', volume: 2, index: 3, title: '曲折',
  cols: 7, rows: 6,
  map: [
    [5,0,0,0,0,0,0],
    [0,1,1,1,1,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,4,0,0,0],
    [0,1,1,1,1,0,0],
    [0,0,0,0,0,0,3],
  ],
  start: { x: 0, y: 0, dir: 'right' },
  packages: [{ x: 3, y: 3 }],
  available: ['forward','left','right','grab','drop'],
  maxSlots: 20, optimal: 16,
  winCondition: 'allPackagesDelivered',
  hint: '两道墙在 row1 和 row4，col0/col5/col6 有通道。先下 col0 到 r3，右到零件(3,3)，再右到 col5，下到终点(6,5)。',
},
{
  id: 'v2-4', volume: 2, index: 4, title: '双包',
  cols: 9, rows: 6,
  map: [
    [5,0,0,0,1,0,0,0,3],
    [0,0,0,0,1,0,0,0,0],
    [0,0,4,0,1,0,4,0,0],
    [0,0,0,0,1,0,0,0,0],
    [0,0,0,0,1,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
  ],
  start: { x: 0, y: 0, dir: 'right' },
  packages: [{ x: 2, y: 2 }, { x: 6, y: 2 }],
  available: ['forward','left','right','grab','drop'],
  maxSlots: 40, optimal: 36,
  winCondition: 'allPackagesDelivered',
  hint: '中央一道长墙，两边各有一包。',
},

/* ============ 第三卷 · 巧思（引入循环指令 ⟳） ============ */

{
  id: 'v3-1', volume: 3, index: 1, title: '方圆',
  cols: 5, rows: 5,
  map: [
    [5,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,3],
  ],
  start: { x: 0, y: 0, dir: 'right' },
  packages: [],
  available: ['forward','left','right','loop'],
  maxSlots: 12, optimal: 5,
  winCondition: 'reachGoal',
  hint: '循环前进 + 右转 + 循环前进，就够了。',
},
{
  id: 'v3-2', volume: 3, index: 2, title: '螺旋',
  cols: 5, rows: 5,
  map: [
    [5,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,3],
  ],
  start: { x: 0, y: 0, dir: 'right' },
  packages: [{ x: 4, y: 0 }],
  available: ['forward','left','right','grab','drop','loop'],
  maxSlots: 14, optimal: 7,
  winCondition: 'allPackagesDelivered',
  hint: '循环前进 拿包 右转 循环前进 放下。',
},
{
  id: 'v3-3', volume: 3, index: 3, title: '方阵',
  cols: 7, rows: 7,
  map: [
    [5,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,3],
  ],
  start: { x: 0, y: 0, dir: 'right' },
  packages: [{ x: 6, y: 6 }],
  available: ['forward','left','right','grab','drop','loop'],
  maxSlots: 16, optimal: 7,
  winCondition: 'allPackagesDelivered',
  hint: '零件就在终点。走到了直接拿、直接放。',
},

/* ============ 第四卷 · 诡道（引入等待 ⏸ 和 多目标） ============ */

{
  id: 'v4-1', volume: 4, index: 1, title: '节拍',
  cols: 6, rows: 6,
  map: [
    [5,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,3],
  ],
  start: { x: 0, y: 0, dir: 'right' },
  packages: [{ x: 2, y: 2 }, { x: 4, y: 4 }],
  available: ['forward','left','right','grab','drop','wait','loop','ifWall','else','endif'],
  maxSlots: 24, optimal: 23,
  winCondition: 'allPackagesDelivered',
  hint: '无墙的开阔地：拿→送→回→拿→送，两次往返。',
},
{
  id: 'v4-2', volume: 4, index: 2, title: '迷宫',
  cols: 7, rows: 7,
  map: [
    [5,0,0,0,1,0,0],
    [0,1,1,0,1,0,0],
    [0,1,0,0,0,0,0],
    [0,1,0,1,1,1,0],
    [0,0,0,0,0,1,0],
    [0,1,1,1,0,1,0],
    [0,0,0,0,0,0,3],
  ],
  start: { x: 0, y: 0, dir: 'right' },
  packages: [],
  available: ['forward','left','right','wait','loop','ifWall','else','endif'],
  maxSlots: 20, optimal: 6,
  winCondition: 'reachGoal',
  hint: '经典沿墙走：循环「ifWall 左转，else 前进」。',
},
{
  id: 'v4-3', volume: 4, index: 3, title: '双终',
  cols: 8, rows: 6,
  map: [
    [5,0,0,0,0,0,0,3],
    [0,0,0,0,0,0,0,0],
    [0,0,4,0,0,4,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,3],
  ],
  start: { x: 0, y: 0, dir: 'right' },
  packages: [
    { x: 2, y: 2, targetX: 7, targetY: 0 },
    { x: 5, y: 2, targetX: 7, targetY: 5 },
  ],
  available: ['forward','left','right','grab','drop','wait','loop','ifWall','else','endif'],
  maxSlots: 28, optimal: 27,
  winCondition: 'allPackagesDeliveredToTarget',
  hint: '每个零件必须放到自己的终点(带 targetX/Y)。先送 P1 到 (7,0)，再送 P2 到 (7,5)。',
},

/* ============ 第五卷 · 终卷（综合考） ============ */

{
  id: 'v5-1', volume: 5, index: 1, title: '征途',
  cols: 8, rows: 7,
  map: [
    [5,0,0,0,1,0,0,0],
    [0,1,1,0,1,0,0,0],
    [0,0,0,0,1,0,0,0],
    [0,0,4,0,0,0,4,0],
    [0,1,1,0,1,0,1,0],
    [0,0,0,0,1,0,0,0],
    [0,0,0,0,0,0,0,3],
  ],
  start: { x: 0, y: 0, dir: 'right' },
  packages: [{ x: 2, y: 3 }, { x: 6, y: 3 }],
  available: ['forward','left','right','grab','drop','wait','loop'],
  maxSlots: 28, optimal: 27,
  winCondition: 'allPackagesDelivered',
  hint: '中间 col4 全是墙，只能绕 r6 底部互通。先 P1→送→绕回→P2→送。',
},
{
  id: 'v5-2', volume: 5, index: 2, title: '四方',
  cols: 8, rows: 8,
  map: [
    [5,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,4,0,0,4,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,4,0,0,4,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,3],
  ],
  start: { x: 0, y: 0, dir: 'right' },
  packages: [{ x: 2, y: 2 }, { x: 5, y: 2 }, { x: 2, y: 5 }, { x: 5, y: 5 }],
  available: ['forward','left','right','grab','drop','wait','loop'],
  maxSlots: 60, optimal: 55,
  winCondition: 'allPackagesDelivered',
  hint: '4 个零件分放 4 角，每次拿一个送一次。顺序 P1→P3 同列、P2→P4 同列省路。',
},
{
  id: 'v5-3', volume: 5, index: 3, title: '终卷',
  cols: 10, rows: 7,
  map: [
    [5,0,0,1,0,0,0,1,0,0],
    [0,0,0,1,0,0,0,1,0,0],
    [0,4,0,0,0,4,0,0,0,0],
    [0,0,0,1,1,1,1,0,0,0],
    [0,4,0,0,0,0,0,0,0,0],
    [0,0,0,1,0,0,0,1,0,0],
    [0,0,0,0,0,0,0,0,0,3],
  ],
  start: { x: 0, y: 0, dir: 'right' },
  packages: [{ x: 1, y: 2 }, { x: 5, y: 2 }, { x: 1, y: 4 }],
  available: ['forward','left','right','grab','drop','wait','loop'],
  maxSlots: 42, optimal: 40,
  winCondition: 'allPackagesDelivered',
  hint: '墨者终卷。r2/r4/r6 全通为三路，P1/P2 在 r2，P3 在 r4，终点(9,6)。P1→送→P2→送→P3→送。',
},

];


/* ============ 工具函数 ============ */

/**
 * 根据 volume + index 查找关卡
 */
function findLevel(volume, index) {
  return LEVELS.find(l => l.volume === volume && l.index === index);
}

/**
 * 根据 id 查找关卡
 */
function findLevelById(id) {
  return LEVELS.find(l => l.id === id);
}

/**
 * 获取所有卷（去重 volume 并排序）
 */
function getVolumes() {
  const vols = [...new Set(LEVELS.map(l => l.volume))];
  vols.sort((a,b) => a-b);
  return vols;
}

/**
 * 获取某卷的所有关卡（按 index 排序）
 */
function getLevelsOfVolume(vol) {
  return LEVELS.filter(l => l.volume === vol).sort((a,b) => a.index - b.index);
}

/**
 * 获取下一关（用于通关后跳转）
 * 返回：下一关对象 | null（最后一关）
 */
function getNextLevel(current) {
  // 跳过每日挑战，只在正卷关卡之间跳转
  const ordered = LEVELS.filter(l => !l.isDaily);
  const idx = ordered.findIndex(l => l.id === current.id);
  if (idx < 0 || idx >= ordered.length - 1) return null;
  return ordered[idx + 1];
}

/**
 * 计算三星
 * score = 实际指令数
 * optimal = 关卡设计的最优解
 * 返回：1 | 2 | 3
 */
function calcStars(score, optimal) {
  if (score <= optimal) return 3;
  if (score <= optimal + 2) return 2;
  if (score <= optimal + 4) return 1;
  return 0;
}

/**
 * 从 URL 读取 levelId（用于 game.html 定位关卡）
 */
function getLevelIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('level') || 'v1-1'; // 默认从第一关开始
}

/**
 * 把关卡数据存到 localStorage（用于星级持久化）
 */
function saveProgress(levelId, stars, score) {
  const key = 'muniu_progress';
  let data = {};
  try { data = JSON.parse(localStorage.getItem(key) || '{}'); } catch(e) {}
  const prev = data[levelId] || { stars: 0, score: 999 };
  data[levelId] = {
    stars: Math.max(prev.stars, stars),
    score: Math.min(prev.score, score),
  };
  localStorage.setItem(key, JSON.stringify(data));
}
function loadProgress(levelId) {
  try {
    const data = JSON.parse(localStorage.getItem('muniu_progress') || '{}');
    return data[levelId] || { stars: 0, score: 999 };
  } catch(e) { return { stars: 0, score: 999 }; }
}

/* ============ 每日挑战：种子化随机地图生成 ============ */

/**
 * mulberry32 — 快速种子化伪随机数生成器
 */
function seedRandom(seed) {
  let s = (seed >>> 0);
  return function() {
    s = (s + 0x6D2B79F5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 把任意字符串 hash 成一个 int32 种子 */
function hashSeed(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** 用 BFS 检查起点到终点是否连通（且不会被墙挡死） */
function isReachable(map, start, goal) {
  const rows = map.length, cols = map[0].length;
  const visited = Array.from({length: rows}, () => Array(cols).fill(false));
  const queue = [[start.x, start.y]];
  visited[start.y][start.x] = true;
  while (queue.length) {
    const [x, y] = queue.shift();
    if (x === goal.x && y === goal.y) return true;
    const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    for (const [dx,dy] of dirs) {
      const nx = x+dx, ny = y+dy;
      if (nx>=0&&nx<cols&&ny>=0&&ny<rows && !visited[ny][nx] && map[ny][nx] !== 1) {
        visited[ny][nx] = true; queue.push([nx,ny]);
      }
    }
  }
  return false;
}

/**
 * 生成一张随机可通关地图
 * @param {string} seed 日期字符串或任意 seed
 * @returns {object} 关卡数据
 */
function generateRandomLevel(seed) {
  const rand = seedRandom(hashSeed(seed));

  // 随机尺寸 6~9 列，5~8 行
  const cols = 6 + Math.floor(rand() * 4);
  const rows = 5 + Math.floor(rand() * 4);

  // 起点 (0, startY)，终点 (cols-1, goalY)
  const startY = Math.floor(rand() * rows);
  const goalY = Math.floor(rand() * rows);

  // 初始化空地图
  const map = Array.from({length: rows}, () => Array(cols).fill(0));

  // 撒墙（20% 密度，但保证起点/终点格及其直接邻格不撒）
  const wallDensity = 0.18 + rand() * 0.12; // 18% ~ 30%
  const safe = new Set();
  safe.add(`${0},${startY}`); safe.add(`${cols-1},${goalY}`);
  [[-1,0],[1,0],[0,-1],[0,1]].forEach(([dx,dy]) => {
    safe.add(`${0+dx},${startY+dy}`);
    safe.add(`${cols-1+dx},${goalY+dy}`);
  });

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (safe.has(`${x},${y}`)) continue;
      if (rand() < wallDensity) map[y][x] = 1;
    }
  }

  // 标记起点(5)和终点(3)
  map[startY][0] = 5;
  map[goalY][cols-1] = 3;

  // 连通性检查——不通就重生成（最多 50 次）
  let attempts = 0;
  while (!isReachable(map, {x:0,y:startY}, {x:cols-1,y:goalY}) && attempts < 50) {
    // 随机去掉一些墙直到连通
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (map[y][x] === 1 && rand() < 0.25) map[y][x] = 0;
      }
    }
    attempts++;
  }

  // 可选：0~2 个零件（30% 概率出零件关）
  const packages = [];
  const pkgCount = rand() < 0.35 ? 1 : (rand() < 0.5 ? 2 : 0);
  if (pkgCount > 0) {
    // 找合适的位置（非墙、非起点、非终点）
    const candidates = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 1; x < cols-1; x++) {
        if (map[y][x] === 0) candidates.push({x,y});
      }
    }
    // 洗牌取前 N 个
    for (let i = candidates.length-1; i > 0; i--) {
      const j = Math.floor(rand()*(i+1));
      [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
    }
    for (let i = 0; i < Math.min(pkgCount, candidates.length); i++) {
      map[candidates[i].y][candidates[i].x] = 4;
      packages.push({ x: candidates[i].x, y: candidates[i].y });
    }
  }

  // 随机起始方向
  const dirs = ['right', 'down', 'up', 'left'];
  const dir = dirs[Math.floor(rand() * dirs.length)];

  // 随机选可用指令（含循环和条件，训练用户技能）
  const allCmds = ['forward','left','right','grab','drop','wait','loop','ifWall','else','endif'];
  // 至少 5 条，最多 10 条
  const cmdCount = 5 + Math.floor(rand() * 6);
  const available = [];
  for (let i = 0; i < cmdCount; i++) {
    const c = allCmds[Math.floor(rand() * allCmds.length)];
    if (!available.includes(c)) available.push(c);
  }
  // 保证基础指令都有
  ['forward','left','right'].forEach(c => { if (!available.includes(c)) available.unshift(c); });

  // 估计指令上限（基于尺寸 + 零件数）
  const maxSlots = Math.min(20, Math.max(10, cols + rows + packages.length * 3));
  const optimal = Math.floor((cols + rows) * 0.9) + packages.length * 3;

  return {
    id: `daily-${seed}`,
    volume: 99, index: 0, title: `每日挑战 ${seed.slice(-4)}`,
    cols, rows, map,
    start: { x: 0, y: startY, dir },
    packages, available,
    maxSlots, optimal,
    winCondition: packages.length > 0 ? 'allPackagesDelivered' : 'reachGoal',
    hint: '每日一题，明天再来一次！',
    isDaily: true,
  };
}

/** 获取今天的每日挑战关卡 */
function getDailyLevel() {
  const d = new Date();
  const seed = `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`;
  return generateRandomLevel(seed);
}

/** 在 level-select 里显示"每日挑战"入口 */
function injectDailyChallenge() {
  const lv = getDailyLevel();
  const exists = LEVELS.find(l => l.isDaily);
  if (exists) {
    exists.cols = lv.cols; exists.rows = lv.rows;
    exists.map = lv.map; exists.start = lv.start;
    exists.packages = lv.packages; exists.available = lv.available;
    exists.maxSlots = lv.maxSlots; exists.optimal = lv.optimal;
  } else {
    LEVELS.push(lv);
  }
  return lv;
}
window.injectDailyChallenge = injectDailyChallenge;

