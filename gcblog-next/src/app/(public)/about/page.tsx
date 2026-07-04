import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GitFork, Mail, MapPin, Calendar, Coffee, Code2, Database, Globe, PenLine, Camera } from 'lucide-react'

/** 关于我页面（经典博客风格，浅色主题） */
export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* 个人信息头部 */}
      <div className="text-center mb-12">
        <Avatar className="w-28 h-28 mx-auto mb-6 border-2 border-[#e2e8f0]">
          <AvatarFallback className="bg-gradient-to-br from-[#3b82f6] to-[#6366f1] text-white text-4xl font-bold">
            GC
          </AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-bold text-foreground mb-2">GCBlog</h1>
        <p className="text-[#64748b] mb-4">记录生活，收集美好，分享热爱</p>
        <div className="flex items-center justify-center gap-4 text-sm text-[#64748b] flex-wrap">
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            中国
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            从 2020 年开始记录
          </span>
          <span className="flex items-center gap-1">
            <Coffee className="w-4 h-4" />
            咖啡与文字
          </span>
        </div>
      </div>

      {/* 个人简介 */}
      <Card className="bg-white border-[#e2e8f0] shadow-sm mb-8">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <PenLine className="w-5 h-5 text-[#3b82f6]" />
            关于我
          </CardTitle>
        </CardHeader>
        <CardContent className="text-[#475569] leading-relaxed space-y-4">
          <p>
            这里是 GCBlog，一个属于我的小角落。我喜欢用文字记录生活中的点滴，
            无论是一本好书、一段旅途，还是某个瞬间的感悟。
          </p>
          <p>
            我相信， ordinary days 里也藏着值得被记住的美好。写博客的初衷很简单：
            留下走过的痕迹，也期待与志同道合的你相遇。
          </p>
          <p>
            感谢你来访，愿这里的某一句话，能给你带来一点温暖或启发。
          </p>
        </CardContent>
      </Card>

      {/* 兴趣爱好 */}
      <Card className="bg-white border-[#e2e8f0] shadow-sm mb-8">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Camera className="w-5 h-5 text-[#3b82f6]" />
            兴趣爱好
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">阅读与写作</h3>
              <div className="flex flex-wrap gap-2">
                {['散文', '小说', '诗歌', '读书笔记', '随笔'].map((tag) => (
                  <Badge key={tag} variant="outline" className="border-[#e2e8f0] text-[#64748b] hover:border-[#3b82f6]/40 hover:text-[#3b82f6] transition-colors">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">生活记录</h3>
              <div className="flex flex-wrap gap-2">
                {['旅行', '摄影', '美食', '咖啡', '电影'].map((tag) => (
                  <Badge key={tag} variant="outline" className="border-[#e2e8f0] text-[#64748b] hover:border-[#3b82f6]/40 hover:text-[#3b82f6] transition-colors">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 联系方式 */}
      <Card className="bg-white border-[#e2e8f0] shadow-sm">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#3b82f6]" />
            联系方式
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-lg border border-[#e2e8f0] hover:border-[#3b82f6]/40 hover:bg-[#f8fafc] transition-all group"
            >
              <GitFork className="w-5 h-5 text-[#64748b] group-hover:text-[#3b82f6] transition-colors" />
              <div>
                <p className="text-sm font-medium text-foreground">GitHub</p>
                <p className="text-xs text-[#94a3b8]">查看我的项目</p>
              </div>
            </a>
            <a
              href="mailto:admin@gcblog.com"
              className="flex items-center gap-3 px-4 py-3 rounded-lg border border-[#e2e8f0] hover:border-[#3b82f6]/40 hover:bg-[#f8fafc] transition-all group"
            >
              <Mail className="w-5 h-5 text-[#64748b] group-hover:text-[#3b82f6] transition-colors" />
              <div>
                <p className="text-sm font-medium text-foreground">Email</p>
                <p className="text-xs text-[#94a3b8]">admin@gcblog.com</p>
              </div>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
