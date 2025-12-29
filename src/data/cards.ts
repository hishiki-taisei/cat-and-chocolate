import type { EventCard, ItemCard, EndCard } from '../types';

export const EVENTS: EventCard[] = [
    // Existing updated
    { id: 'e1', type: 'EVENT', name: '宿題が終わらない！', itemCount: 3, flavorText: '明日が提出期限なのに！' },
    { id: 'e2', type: 'EVENT', name: 'トイレの紙がない！', itemCount: 3, flavorText: '紙神様に見放された！' },
    { id: 'e3', type: 'EVENT', name: '宇宙艦隊襲来！', itemCount: 2, flavorText: '地球滅亡のカウントダウン！' },
    { id: 'e4', type: 'EVENT', name: '靴紐が絶対解けない！', itemCount: 3, flavorText: 'このままじゃ一生靴が脱げない！' },
    { id: 'e5', type: 'EVENT', name: '動物園から猛獣脱走！', itemCount: 2, flavorText: 'ライオンが目の前にいる！' },
    { id: 'e6', type: 'EVENT', name: '恋人が激怒！', itemCount: 2, flavorText: '修羅場突入！理由は不明！' },
    { id: 'e7', type: 'EVENT', name: '無人島に漂着！', itemCount: 3, flavorText: '水も食料もない！' },
    { id: 'e8', type: 'EVENT', name: 'ゾンビの大群に囲まれた', itemCount: 2, flavorText: '噛まれたら終わり！' },
    { id: 'e9', type: 'EVENT', name: '財布を忘れた！', itemCount: 3, flavorText: '愉快なサザエさん状態...ではない！' },
    { id: 'e10', type: 'EVENT', name: '寝坊した！', itemCount: 3, flavorText: '遅刻確定！？人生の危機！' },
    { id: 'e11', type: 'EVENT', name: 'ゲリラ豪雨！', itemCount: 3, flavorText: '傘がない！服が透ける！' },
    { id: 'e12', type: 'EVENT', name: 'スマホの充電切れ！', itemCount: 3, flavorText: 'デジタルデトックスの強制！' },
    { id: 'e13', type: 'EVENT', name: '高級ガムを踏んだ', itemCount: 3, flavorText: 'お気に入りの靴なのに取れない！' },
    { id: 'e14', type: 'EVENT', name: 'パスワード忘れた！', itemCount: 3, flavorText: 'アカウントロックされちゃう！' },
    { id: 'e15', type: 'EVENT', name: '高級アイスが落ちた', itemCount: 2, flavorText: '3秒ルール適用？いや無理！' },
    { id: 'e16', type: 'EVENT', name: '飼い猫が脱走！', itemCount: 2, flavorText: '驚異的なスピード！' },
    { id: 'e17', type: 'EVENT', name: 'レンジが爆発！', itemCount: 2, flavorText: '黒煙が上がっている！' },
    { id: 'e18', type: 'EVENT', name: '樹海で迷った', itemCount: 3, flavorText: 'コンパスが効かない...？' },
    { id: 'e19', type: 'EVENT', name: '大事な書類にコーヒー！', itemCount: 3, flavorText: '社長への提出書類が...' },
    { id: 'e20', type: 'EVENT', name: '巨大ゴキブリ出現！', itemCount: 2, flavorText: 'こっちに飛んできた！' },

    // New additions
    { id: 'e21', type: 'EVENT', name: '恋人がゾンビ化！', itemCount: 2, flavorText: '愛で治せるか！？' },
    { id: 'e22', type: 'EVENT', name: '巨大な岩が転がってきた！', itemCount: 3, flavorText: 'インディ・ジョーンズ気分！' },
    { id: 'e23', type: 'EVENT', name: '会議が大荒れ！', itemCount: 2, flavorText: 'みんな殺気立っている！' },
    { id: 'e24', type: 'EVENT', name: '宇宙船のAIが暴走！', itemCount: 3, flavorText: '「申し訳ありませんができません」' },
    { id: 'e25', type: 'EVENT', name: '刑務所から脱獄したい', itemCount: 2, flavorText: '冤罪なんです！' },
    { id: 'e26', type: 'EVENT', name: '豪華客船が沈没寸前！', itemCount: 3, flavorText: '氷山の一角だった！' },
    { id: 'e27', type: 'EVENT', name: 'タイムマシンの燃料切れ！', itemCount: 2, flavorText: '恐竜時代に取り残される！' },
    { id: 'e28', type: 'EVENT', name: '変身スーツが小さい！', itemCount: 3, flavorText: 'ヒーローなのにチャックが閉まらない！' },
    { id: 'e29', type: 'EVENT', name: '謎のペットを譲られた', itemCount: 3, flavorText: '餌が何かわからない！' },
    { id: 'e30', type: 'EVENT', name: '恐竜の島に不時着！', itemCount: 3, flavorText: 'T-REXの足音が聞こえる...' },
    { id: 'e31', type: 'EVENT', name: '未知の伝染病パンデミック！', itemCount: 2, flavorText: 'マスクがない！' },
    { id: 'e32', type: 'EVENT', name: '留守番中に泥棒遭遇！', itemCount: 2, flavorText: '鉢合わせしてしまった！' },
    { id: 'e33', type: 'EVENT', name: '身分違いの恋', itemCount: 2, flavorText: '駆け落ちするしかない！？' },
    { id: 'e34', type: 'EVENT', name: '閑古鳥の居酒屋', itemCount: 3, flavorText: 'このままじゃ倒産だ！' },
    { id: 'e35', type: 'EVENT', name: '魔法学校に入学！', itemCount: 3, flavorText: 'でも魔法が使えない！' },
    { id: 'e36', type: 'EVENT', name: 'マフィア潜入捜査バレた！？', itemCount: 3, flavorText: 'コンクリート詰めにされる！' },
];

export const ITEMS: ItemCard[] = [
    // Existing
    { id: 'i1', type: 'ITEM', name: 'ねこ' },
    { id: 'i2', type: 'ITEM', name: 'チョコレート' },
    { id: 'i3', type: 'ITEM', name: 'ロープ' },
    { id: 'i4', type: 'ITEM', name: '辞書' },
    { id: 'i5', type: 'ITEM', name: '札束' },
    { id: 'i6', type: 'ITEM', name: 'スマホ' },
    { id: 'i7', type: 'ITEM', name: '消火器' },
    { id: 'i8', type: 'ITEM', name: '口紅' },
    { id: 'i9', type: 'ITEM', name: 'ドライバー' },
    { id: 'i10', type: 'ITEM', name: '靴下' },
    { id: 'i11', type: 'ITEM', name: '石鹸' },
    { id: 'i12', type: 'ITEM', name: '自転車' },
    // New
    { id: 'i13', type: 'ITEM', name: '社長' },
    { id: 'i14', type: 'ITEM', name: '宇宙服' },
    { id: 'i15', type: 'ITEM', name: '名前を書くと死ぬノート' },
    { id: 'i16', type: 'ITEM', name: '未経験の新人' },
    { id: 'i17', type: 'ITEM', name: 'はんだごて' },
    { id: 'i18', type: 'ITEM', name: 'sudoコマンド' },
    { id: 'i19', type: 'ITEM', name: '「仕様です」' },
    { id: 'i20', type: 'ITEM', name: '再起動' },
];

export const END_CARD: EndCard = {
    id: 'end',
    type: 'END',
    name: 'END',
    description: 'ゲーム終了'
};
