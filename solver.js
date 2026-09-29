/* ============ 木牛流马 BFS 求解器 ============ */
/**
 * 给定关卡，搜索最短指令序列让木牛流马通关
 * 纯同步执行，无外部依赖
 *
 * 状态 = { x, y, dir, carrying, picked: Set<已拿零件索引>, dropped: Set<已放下到目标的索引> }
 * 指令序列 = 数组，直接可用于 TEST_CASES
 */

function solveLevel(level) {
  const { cols, rows, map, start, packages, winCondition } = level;
  const DIRS = ['up','right','down','left'];
  const DIR_VEC = { up:[0,-1], right:[1,0], down:[0,1], left:[-1,0] };
  const dirIdx = { up:0, right:1, down:2, left:3 };

  function turnLeft(d)  { return DIRS[(dirIdx[d]+3)%4]; }
  function turnRight(d) { return DIRS[(dirIdx[d]+1)%4]; }
  function canWalk(x,y) { return x>=0&&x<cols&&y>=0&&y<rows && map[y][x]!==1; }

  const pkgCount = packages.length;

  // 目标：winCondition 是什么
  function isGoal(state) {
    if (winCondition === 'reachGoal') {
      return map[state.y][state.x] === 3;
    }
    if (winCondition === 'allPackagesDelivered') {
      // 所有零件都放下到终点（终点=3的格子）
      const goalCell = map[state.y][state.x] === 3;
      return goalCell && state.dropped.size === pkgCount && state.carrying === null;
    }
    if (winCondition === 'allPackagesDeliveredToTarget') {
      // 每个零件都放下到自己的 targetX/Y
      return state.dropped.size === pkgCount && state.carrying === null;
    }
    return false;
  }

  // 状态 key（用于 visited 去重）
  function stateKey(s) {
    const picked = [...s.picked].sort().join(',');
    const dropped = [...s.dropped].sort().join(',');
    return `${s.x},${s.y},${s.dir},${s.carrying},${picked}|${dropped}`;
  }

  // 指令候选：只用基础 5 条（forward/left/right/grab/drop）
  // 循环和条件需要人工组合，BFS 搜线性序列就够了
  const CMDS = ['forward','left','right','grab','drop'];

  // BFS
  const initial = {
    x: start.x, y: start.y, dir: start.dir,
    carrying: null, picked: new Set(), dropped: new Set(),
    path: []
  };

  const queue = [initial];
  const visited = new Map();
  visited.set(stateKey(initial), 0); // key → 最短指令长度

  let best = null;
  let iterations = 0;
  const MAX_ITER = 200000; // 安全上限

  while (queue.length > 0 && iterations < MAX_ITER) {
    iterations++;
    const cur = queue.shift();

    if (isGoal(cur)) {
      best = cur.path;
      break;
    }

    if (cur.path.length > 60) continue; // 剪枝：超过 60 步不搜了

    for (const cmd of CMDS) {
      const next = {
        x: cur.x, y: cur.y, dir: cur.dir,
        carrying: cur.carrying,
        picked: new Set(cur.picked),
        dropped: new Set(cur.dropped),
        path: [...cur.path, cmd]
      };

      if (cmd === 'forward') {
        const vec = DIR_VEC[cur.dir];
        const nx = cur.x + vec[0], ny = cur.y + vec[1];
        if (!canWalk(nx, ny)) continue; // 撞墙，跳过这条分支
        next.x = nx; next.y = ny;
      } else if (cmd === 'left') {
        next.dir = turnLeft(cur.dir);
      } else if (cmd === 'right') {
        next.dir = turnRight(cur.dir);
      } else if (cmd === 'grab') {
        if (cur.carrying !== null) continue; // 已携带，跳过
        // 检查脚下和前方一格
        const vec = DIR_VEC[cur.dir];
        const candidates = [
          { x: cur.x, y: cur.y },
          { x: cur.x + vec[0], y: cur.y + vec[1] }
        ];
        let grabbed = false;
        for (const pos of candidates) {
          if (!canWalk(pos.x, pos.y)) continue;
          const pi = packages.findIndex((p, idx) => !cur.picked.has(idx) && p.x === pos.x && p.y === pos.y);
          if (pi >= 0) {
            next.carrying = pi;
            next.picked.add(pi);
            if (pos.x === cur.x + vec[0] && pos.y === cur.y + vec[1]) {
              // 从前方拿的，也要移动过去
              next.x = pos.x; next.y = pos.y;
            }
            grabbed = true;
            break;
          }
        }
        if (!grabbed) continue; // 没拿到东西，跳过
      } else if (cmd === 'drop') {
        if (cur.carrying === null) continue; // 没东西放，跳过
        const pi = cur.carrying;
        // 判断是否送达目标
        let delivered = false;
        if (winCondition === 'allPackagesDeliveredToTarget') {
          const p = packages[pi];
          delivered = (p.targetX === cur.x && p.targetY === cur.y);
        } else {
          delivered = (map[cur.y][cur.x] === 3);
        }
        if (delivered) {
          next.dropped.add(pi);
        }
        next.carrying = null;
      }

      // 去重
      const key = stateKey(next);
      if (visited.has(key) && visited.get(key) <= next.path.length) continue;
      visited.set(key, next.path.length);
      queue.push(next);
    }
  }

  return { best, iterations, found: !!best };
}

/* ============ 在 Node.js 环境直接跑 ============ */
if (typeof require !== 'undefined' && require.main === module) {
  // Node.js 环境下手动加载 levels.js
  const fs = require('fs');
  const vm = require('vm');
  const code = fs.readFileSync('levels.js', 'utf8');
  const sandbox = { window: {}, console };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  const LEVELS = sandbox.window.LEVELS;

  console.log('========== 木牛流马 · 全关卡最优解 BFS 验证 ==========\n');
  const results = [];
  for (const lv of LEVELS) {
    // 只算基础 5 条指令能解的关（v1-v2 全部，v3+ 只算 reachGoal 的）
    const onlyBase = lv.available.every(c => ['forward','left','right','grab','drop'].includes(c));
    if (!onlyBase) {
      console.log(`⏭  ${lv.id} ${lv.title} — 含高级指令，BFS 跳过（需循环/条件）`);
      continue;
    }

    const t0 = Date.now();
    const { best, iterations, found } = solveLevel(lv);
    const t1 = Date.now();
    if (found) {
      console.log(`✅ ${lv.id} ${lv.title.padEnd(6)} | 最优 ${best.length} 条 | levels.js 写的 ${lv.optimal} | 搜索 ${iterations} 状态 (${t1-t0}ms)`);
      if (best.length !== lv.optimal) {
        console.log(`   ⚠️ optimal 值需修正：${lv.optimal} → ${best.length}`);
      }
      results.push({ id: lv.id, found: true, optimal: best.length, path: best });
    } else {
      console.log(`❌ ${lv.id} ${lv.title.padEnd(6)} | 60步内无解！(搜索 ${iterations} 状态)`);
      results.push({ id: lv.id, found: false });
    }
  }
  console.log('\n========== TEST_CASES 生成 ==========');
  console.log('// 把下面的结果复制到 game.html 的 TEST_CASES 对象里');
  console.log('{');
  for (const r of results) {
    if (r.found) {
      const obj = r.path.map(t => `{type:'${t}'}`).join(',');
      console.log(`  '${r.id}': [${obj}],`);
    }
  }
  console.log('}');
}
