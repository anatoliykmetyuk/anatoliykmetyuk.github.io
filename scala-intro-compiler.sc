#!/usr/bin/env scala-cli
//> using scala "3.1.1"
import $ivy.`com.lihaoyi::os-lib:0.8.1`

import java.io.File
import scala.collection.mutable.ListBuffer

def onlyFileWithExtension(directory: os.Path, extension: String): os.Path =
  os.list(directory).find(_.ext == extension).get

val bundle = onlyFileWithExtension(os.pwd, "textbundle")
val markdown = onlyFileWithExtension(bundle, "md")
val sourceLines = os.read.lines(markdown)

case class Chapter(id: Int, name: String, text: String)
def parseChapters(lines: Seq[String]): List[Chapter] =
  val titleRegex = """^#\s+(.+)$""".r

  val articlesBuf = ListBuffer.empty[Chapter]
  var currentArticleTitle: String = null
  val currentArticleTextBldr = new StringBuilder()
  var currentChapterId = 1

  def flush() =
    articlesBuf.append(Chapter(currentChapterId, currentArticleTitle, currentArticleTextBldr.result()))
    currentArticleTextBldr.clear()
    currentChapterId += 1

  for line <- lines.toList do line match
    case titleRegex(title) =>
      if currentArticleTitle != null then flush()
      currentArticleTitle = title
    case _ =>
      currentArticleTextBldr.append(line).append('\n')
  flush()
  articlesBuf.result()
end parseChapters

def clearOutput() =
  val markdown = os.pwd / "scala-intro"
  val assets = os.pwd / "static" / "scala-intro_assets"
  (os.list(markdown) ++ os.list(assets)).foreach(os.remove.all)

def processChapter(c: Chapter): Unit =
  val chapterSlug = "%02d".format(c.id) + "-" + c.name.replace(" ", "-").toLowerCase
  var text = c.text

  def routeAssets() =
    val assetNamesBuf = ListBuffer.empty[String]
    val imageRegex = """!\[\]\(assets\/(.+)\)""".r
    text = imageRegex.replaceAllIn(text, m => {
      assetNamesBuf.append(m.group(1).replace("%20", " "))
      s"![](/scala-intro_assets/${m.group(1)})"
    })
    assetNamesBuf.result()

  def addToc() =
    text = "```toc\n```\n" + text

  def writeChapter() =
    os.write(os.pwd / "scala-intro" / s"$chapterSlug.md", text)

  def writeAssets(assets: Seq[String]) =
    val assetsDir = os.pwd / "static" / "scala-intro_assets" / chapterSlug
    os.makeDir(assetsDir)
    for asset <- assets do os.copy.into(bundle / "assets" / asset, assetsDir)

  val assets = routeAssets()
  addToc()
  writeChapter()
  writeAssets(assets)
end processChapter

clearOutput()
parseChapters(sourceLines).foreach(processChapter)
