'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RichTextEditor } from '@/components/common/rich-text-editor';
import { Disclosure } from '@headlessui/react';
import { ChevronUp, Send } from 'lucide-react';
import { ArticleBody } from '@/types/other/artical';
import { postArticle } from '@/apis/article';

export default function ArticleEditor() {
  const router = useRouter();
  const [formData, setFormData] = useState<ArticleBody>({
    title: '',
    content: '',
    subtitle: '',
    slug: '',
    cover: '',
    keywords: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  console.log(error);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!formData.title || !formData.content) {
      setError('标题和内容为必填项');
      return;
    }
    try {
      setIsSubmitting(true);
      const res = await postArticle(formData);
      router.push('/knowledge');
    } catch (err) {
      setError('提交失败，请稍后重试');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='container mx-auto px-4 py-8 max-w-4xl'>
      <div className='container mx-auto px-4 py-8'>
        <div className='flex justify-between items-center mb-8'>
          <button
            onClick={() => router.back()}
            className='text-cyber-blue hover:text-cyber-blue-light  inline-flex items-center '
          >
            ← 返回
          </button>

          <div className='flex items-center gap-4'>
            <button
              onClick={() => router.push('/knowledge/edit')}
              className='cursor-pointer bg-dark-card text-cyber-blue px-6 py-2 rounded-lg text-sm font-medium flex items-center hover:shadow-neon transition-all duration-300 border border-cyber-blue/30'
            >
              <span>暂存文章</span>
            </button>

            <button
              onClick={handleSubmit}
              className='cursor-pointer bg-dark-card text-cyber-blue px-6 py-2 rounded-lg text-sm font-medium flex items-center hover:shadow-neon transition-all duration-300 border border-cyber-blue/30 bg-gradient-to-r from-[#00f3ff] to-cyan-500 hover:shadow-neon'
            >
              <Send className='w-4 h-4 text-white mr-1' />
              <span className='text-white'>发布文章</span>
            </button>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className='bg-gray-800/50 dark:bg-gray-900/50 rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,255,170,0.05)] transition-all duration-300 border border-gray-700/30'
        >
          <div className='space-y-6'>
            {/* 标题 */}
            <div>
              <label className='block text-sm font-medium text-[#00f3ff] mb-2'>文章标题</label>
              <input
                type='text'
                className='w-full bg-gray-800/50 border border-[#00f3ff]/30 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[#00f3ff]'
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            {/* 富文本编辑器 */}
            <div>
              <label className='block text-sm font-medium text-[#00f3ff] mb-2'>内容编辑</label>
              <RichTextEditor
                value={formData.content}
                onChange={content => setFormData({ ...formData, content })}
                className='border border-[#00f3ff]/30 rounded-lg overflow-hidden'
              />
            </div>

            {/* 高级设置 */}
            <Disclosure>
              {({ open }) => (
                <div className='border border-[#00f3ff]/30 rounded-lg'>
                  <Disclosure.Button className='flex justify-between w-full px-4 py-2 bg-dark-card/50'>
                    <span className='text-[#00f3ff] text-sm font-medium'>高级设置</span>
                    <ChevronUp
                      className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-[#00f3ff]`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className='px-4 py-6 space-y-6 bg-dark-card/20'>
                    {/* 副标题 */}
                    <div>
                      <label className='block text-sm font-medium text-[#00f3ff] mb-2'>
                        副标题
                      </label>
                      <input
                        type='text'
                        className='w-full bg-gray-800/50 border border-[#00f3ff]/30 rounded-lg px-4 py-2 text-white'
                        value={formData.subtitle}
                        onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                      />
                    </div>

                    {/* Slug */}
                    <div>
                      <label className='block text-sm font-medium text-[#00f3ff] mb-2'>
                        URL标识（slug）
                      </label>
                      <input
                        type='text'
                        className='w-full bg-gray-800/50 border border-[#00f3ff]/30 rounded-lg px-4 py-2 text-white'
                        value={formData.slug}
                        onChange={e => setFormData({ ...formData, slug: e.target.value })}
                      />
                    </div>

                    {/* 封面上传 */}
                    <div>
                      <label className='block text-sm font-medium text-[#00f3ff] mb-2'>
                        封面图片
                      </label>
                      <div className='flex items-center space-x-4'>
                        <input
                          type='file'
                          className='hidden'
                          id='cover-upload'
                          accept='image/*'
                          onChange={e => {
                            if (e.target.files?.[0]) {
                              const file = e.target.files[0];
                              const reader = new FileReader();
                              reader.onload = event => {
                                setFormData({
                                  ...formData,
                                  cover: event.target?.result as string,
                                });
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        <label
                          htmlFor='cover-upload'
                          className='cursor-pointer bg-dark-card border border-[#00f3ff]/30 px-4 py-2 rounded-lg text-sm hover:shadow-neon transition-all text-[#00f3ff]'
                        >
                          选择文件
                        </label>
                        {formData.cover && (
                          <div className='w-20 h-20 rounded-lg overflow-hidden border border-[#00f3ff]/30'>
                            <img
                              src={formData.cover}
                              alt='封面预览'
                              className='w-full h-full object-cover'
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          </div>
        </form>
      </div>
    </div>
  );
}
