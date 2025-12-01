'use client';

import { useState } from 'react';
import { Sparkles, Save, Copy, RefreshCw } from 'lucide-react';

interface GeneratedPlan {
    title: string;
    target_audience: string;
    concept: string;
    story_structure: {
        intro: string;
        buildup: string;
        climax: string;
        conclusion: string;
    };
    emotional_goals: string;
    actor_persona: string;
    viral_points: string;
}

export function PlanGenerator() {
    const [loading, setLoading] = useState(false);
    const [plan, setPlan] = useState<GeneratedPlan | null>(null);
    const [formData, setFormData] = useState({
        keyword: '',
        target: '',
        vibe: 'funny'
    });

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Mock generation delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mock data
        setPlan({
            title: "【衝撃】30代独身男性のリアルな休日ルーティンがやばすぎたwww",
            target_audience: "20代〜30代の社会人男性、共感を求めている人",
            concept: "完璧そうに見えて実はズボラな一面を見せるギャップ萌えコンテンツ",
            story_structure: {
                intro: "「エリート商社マンの休日」というテロップと共に、カッコよく目覚めるシーン...と思いきや二度寝。",
                buildup: "おしゃれな朝食を作ろうとして失敗し、結局カップラーメンをすする。",
                climax: "ジムに行こうと着替えるが、YouTubeを見始めて結局行かない。",
                conclusion: "「まあ、明日から本気出す」というテロップで締めくくる。"
            },
            emotional_goals: "「あるあるw」「自分もだわ」という共感と安心感を与える。",
            actor_persona: "少し自意識過剰だが憎めないキャラクター。独り言が多い。",
            viral_points: "冒頭のカッコいいシーンと直後のズボラシーンの落差（ギャップ）を最初の3秒で見せる。"
        });

        setLoading(false);
    };

    return (
        <div className="grid gap-8 lg:grid-cols-2">
            {/* Input Form */}
            <div className="rounded-lg bg-white p-6 shadow-sm h-fit">
                <div className="mb-6 flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    <h2 className="text-lg font-semibold text-gray-900">企画を生成する</h2>
                </div>

                <form onSubmit={handleGenerate} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            テーマ・キーワード
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.keyword}
                            onChange={(e) => setFormData({ ...formData, keyword: e.target.value })}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                            placeholder="例: 一人暮らし ルーティン"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            ターゲット層
                        </label>
                        <input
                            type="text"
                            value={formData.target}
                            onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                            placeholder="例: 20代社会人"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            雰囲気（Vibe）
                        </label>
                        <select
                            value={formData.vibe}
                            onChange={(e) => setFormData({ ...formData, vibe: e.target.value })}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                        >
                            <option value="funny">面白・コメディ</option>
                            <option value="emotional">エモい・感動</option>
                            <option value="educational">ためになる・教育</option>
                            <option value="vlog">日常・Vlog</option>
                            <option value="dance">ダンス・トレンド</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-4 flex w-full items-center justify-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 disabled:opacity-50 transition-colors"
                    >
                        {loading ? (
                            <>
                                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                AIが思考中...
                            </>
                        ) : (
                            <>
                                <Sparkles className="mr-2 h-4 w-4" />
                                企画を生成
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* Result Display */}
            <div className="space-y-6">
                {!plan ? (
                    <div className="flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 text-center">
                        <Sparkles className="mb-2 h-8 w-8 text-gray-300" />
                        <p className="text-sm text-gray-500">
                            左側のフォームに入力して<br />
                            AIに企画を提案してもらいましょう
                        </p>
                    </div>
                ) : (
                    <div className="rounded-lg bg-white shadow-sm border border-purple-100 overflow-hidden">
                        <div className="bg-purple-50 px-6 py-4 border-b border-purple-100 flex justify-between items-start">
                            <div>
                                <span className="inline-block rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800 mb-2">
                                    AI生成プラン
                                </span>
                                <h3 className="text-xl font-bold text-gray-900">{plan.title}</h3>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                                <Copy className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Concept & Target */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">コンセプト</h4>
                                    <p className="mt-1 text-sm text-gray-900">{plan.concept}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">ターゲット</h4>
                                    <p className="mt-1 text-sm text-gray-900">{plan.target_audience}</p>
                                </div>
                            </div>

                            {/* Story Structure */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h4 className="text-sm font-semibold text-gray-900 mb-3">ストーリー構成</h4>
                                <div className="space-y-3">
                                    <div className="flex">
                                        <span className="flex-shrink-0 w-12 text-xs font-bold text-purple-600 pt-0.5">起</span>
                                        <p className="text-sm text-gray-700">{plan.story_structure.intro}</p>
                                    </div>
                                    <div className="flex">
                                        <span className="flex-shrink-0 w-12 text-xs font-bold text-purple-600 pt-0.5">承</span>
                                        <p className="text-sm text-gray-700">{plan.story_structure.buildup}</p>
                                    </div>
                                    <div className="flex">
                                        <span className="flex-shrink-0 w-12 text-xs font-bold text-purple-600 pt-0.5">転</span>
                                        <p className="text-sm text-gray-700">{plan.story_structure.climax}</p>
                                    </div>
                                    <div className="flex">
                                        <span className="flex-shrink-0 w-12 text-xs font-bold text-purple-600 pt-0.5">結</span>
                                        <p className="text-sm text-gray-700">{plan.story_structure.conclusion}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-900">演者ペルソナ</h4>
                                    <p className="mt-1 text-sm text-gray-600">{plan.actor_persona}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-900">感情設計（ゴール）</h4>
                                    <p className="mt-1 text-sm text-gray-600">{plan.emotional_goals}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-900">バズるポイント</h4>
                                    <p className="mt-1 text-sm text-gray-600">{plan.viral_points}</p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-4 border-t border-gray-100 flex justify-end">
                                <button className="flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
                                    <Save className="mr-2 h-4 w-4" />
                                    企画を保存
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
